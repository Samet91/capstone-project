import type { Collection } from 'mongodb'
import { MongoClient } from 'mongodb'
import type { Transaction } from '../../types'

let client: MongoClient

export async function connectDatabase(url: string): Promise<void> {
  client = new MongoClient(url)
  await client.connect()
}

export function getCollection(): Collection<Transaction> {
  return client.db().collection('expenseTracker')
}
