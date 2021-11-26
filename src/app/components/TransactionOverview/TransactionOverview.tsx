import React from 'react'

import type { Transaction } from '../TransactionForm/TransactionForm'

export type InitialStateType = {
  transactions: Transaction[]
}

export default function TransactionOverview({
  transactions,
}: InitialStateType): JSX.Element {
  return (
    <div>
      <h2>Überblick:</h2>

      <ul>
        {transactions.map((transaction: Transaction) => (
          <li {...(transaction.amount < 0 ? '-' : '')}>
            <span>
              {transaction.category}€{Math.abs(transaction.amount)}
            </span>
            <button>X</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
