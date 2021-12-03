import type { Collection } from 'mongodb'
import { MongoClient } from 'mongodb'
import type { TransactionProps } from '../../types'

let client: MongoClient

export async function connectDatabase(url: string): Promise<void> {
  client = new MongoClient(url)
  await client.connect()
}

export function getCollection(): Collection<TransactionProps> {
  return client.db().collection('expenseTracker')
}
