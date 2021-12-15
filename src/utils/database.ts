import type { Collection } from 'mongodb'
import { MongoClient } from 'mongodb'
import type { Transaction } from '../types'

let client: MongoClient

interface User {
  username: string
  password: string
  transactions?: Transaction[]
}

export async function connectDatabase(url: string): Promise<void> {
  client = new MongoClient(url)
  await client.connect()
}

export function getCollection(): Collection<User> {
  return client.db().collection('expenseTracker')
}
