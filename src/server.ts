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
  res.status(200).send('Newcost was added')
})

app.delete('/api/delete/:_id', async (req, res) => {
  const costId = req.params._id
  await getCollection().deleteOne({ _id: Number(costId) })
  res.status(200).send('deleted one transaction')
})

app.get('/api/costs', async (_req, res) => {
  const existingCosts = await getCollection().find().toArray()
  res.send(existingCosts)
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
