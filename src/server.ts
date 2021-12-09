import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { connectDatabase, getCollection } from './app/hooks/database'

if (!process.env.MONGODB_URI) {
  throw new Error('No MongoDB URL dotenv variable')
}

const app = express()
const port = process.env.PORT || 3001

app.use(express.json())

app.get('/', async (req, res) => {
  const username = req.cookies.username
  const findUser = await getCollection().findOne({ username })
  if (findUser) {
    res.redirect(`/${username}`)
  } else {
    res.redirect('/login')
  }
})

app.patch('/api/costs/:username', async (req, res) => {
  const username = req.params.username
  const newCosts = req.body
  if (username === req.cookies.username) {
    await getCollection().updateOne(
      { username },
      {
        $push: {
          transaction: {
            _id: newCosts._id,
            category: newCosts.category,
            amount: newCosts.amount,
            type: newCosts.type,
            date: newCosts.date,
          },
        },
      }
    )
    res.status(200).send('Newcost were added')
  } else {
    res.status(403).send('Add failed')
  }
})

app.delete('/:username/api/delete/:_id', async (req, res) => {
  const username = req.params.username
  const costId = req.params._id
  await getCollection().updateOne(
    { username },
    { $pull: { transactions: { _id: costId } } }
  )
  res.status(200).send('transaction was deleted')
})

app.get('/:username/api/costs', async (req, res) => {
  const username = req.params.username
  const existingCosts = await getCollection().findOne({ username })
  res.send(existingCosts)
})

app.post('/api/register', async (req, res) => {
  const newUser = req.body
  const existingUser = await getCollection().findOne({
    username: newUser.username,
  })
  if (existingUser) {
    res
      .status(409)
      .send(
        `${newUser.username} Account already exists! please choose another name`
      )
  } else {
    await getCollection().insertOne(newUser)
    res.status(201).send('Your Account was created')
  }
})

app.post('/api/login', async (req, res) => {
  const user = req.body
  const existingUser = await getCollection().findOne(
    { username: user.username },
    { projection: { _id: 0, username: 1, password: 1 } }
  )
  if (existingUser && existingUser.password === user.password) {
    res.setHeader('Set-Cookie', `username=${existingUser.username}`)
    res.status(200).send('Login successful')
  } else {
    res.status(403).send('Password incorrect')
  }
})

app.get('/api/hello', (_request, response) => {
  response.json({ message: 'Hello API!' })
})

app.use('/storybook', express.static('dist/storybook'))

app.use(express.static('dist/app'))

app.get('*', (_request, response) => {
  response.sendFile('index.html', { root: 'dist/app' })
})

connectDatabase(process.env.MONGODB_URI).then(() =>
  app.listen(port, () => {
    console.log(`Server listening on port  http://localhost:${port}!`)
  })
)
