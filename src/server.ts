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

app.post('/api/costs', async (req, res) => {
  const newCosts = req.body
  await getCollection().insertOne(newCosts)
  res.status(200).send('Newcost were added')
})

app.delete('/api/delete/:_id', async (req, res) => {
  const costId = req.params._id
  await getCollection().deleteOne({ _id: Number(costId) })
  res.status(200).send('transaction was deleted')
})

app.get('/api/costs', async (_req, res) => {
  const existingCosts = await getCollection().find().toArray()
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
