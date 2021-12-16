import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cookieParser from 'cookie-parser'
import { connectDatabase, getCollection } from './utils/database'
import jwt from 'jsonwebtoken'

if (!process.env.MONGODB_URI) {
  throw new Error('No MongoDB URL dotenv variable')
}

const app = express()
const port = process.env.PORT || 3001

const { JWT_SECRET } = process.env

if (!JWT_SECRET) {
  throw new Error('No JWT_SECRET provided')
}

app.use(express.json())

app.use(cookieParser())

app.patch('/api/costs/:username', async (req, res) => {
  const username = req.params.username
  const newCosts = req.body
  const { sessiontoken } = req.cookies

  if (username === jwt.verify(sessiontoken, JWT_SECRET)) {
    const insertedCost = await getCollection().updateOne(
      { username },
      {
        $push: {
          transactions: {
            id: newCosts.id,
            category: newCosts.category,
            amount: newCosts.amount,
            type: newCosts.type,
            date: newCosts.date,
          },
        },
      }
    )
    if (insertedCost.modifiedCount > 0) {
      res.status(200).send('Newcost were added')
    } else {
      res.status(403).send('Add failed')
    }
  }
})

app.patch('/api/delete/:username/:id', async (req, res) => {
  const username = req.params.username
  const costId = req.params.id

  const deletedCost = await getCollection().updateOne(
    { username },
    { $pull: { transactions: { id: Number(costId) } } }
  )
  console.log(deletedCost)

  if (deletedCost.modifiedCount > 0) {
    res.status(200).send('transaction was deleted')
  } else {
    res.status(400).send(' transaction can not be deleted')
  }
})

app.get('/api/costs/:username', async (req, res) => {
  const username = req.params.username

  const existingCosts = await getCollection().findOne({ username })

  if (existingCosts) {
    res.status(200).send(existingCosts.transactions)
  } else {
    res.status(200).send(null)
  }
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
    const token = jwt.sign(user.username, JWT_SECRET)
    res.cookie('sessiontoken', token).send()
    res.status(200).send('Login successful')
  } else {
    res.status(403).send('Password incorrect')
  }
})

app.post('/api/logout', async (_req, res) => {
  res.clearCookie('sessiontoken')
  res.redirect('/')
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
