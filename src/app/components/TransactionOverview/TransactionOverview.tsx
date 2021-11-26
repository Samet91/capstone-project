import React from 'react'

import type { TransactionProps } from '../TransactionForm/TransactionForm'

export type InitialStateType = {
  transactions: TransactionProps[]
}

export default function TransactionOverview({
  transactions,
}: InitialStateType): JSX.Element {
  return (
    <div>
      <h2>Überblick:</h2>

      <ul>
        {transactions.map((transaction: TransactionProps) => (
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
