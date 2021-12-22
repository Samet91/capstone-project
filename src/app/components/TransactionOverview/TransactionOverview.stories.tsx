import React from 'react'
import TransactionOverview from './TransactionOverview'

export default {
  title: 'Component/TransactionOverview',
  component: TransactionOverview,
}

const example = [
  {
    id: 0,
    category: 'schuhe',
    amount: 30,
    type: 'expense',
    date: '02.12.2021',
  },
]

export const Regular = (): JSX.Element => (
  <TransactionOverview
    transactions={example}
    deleteTransaction={function (): void {
      throw new Error('Function not implemented.')
    }}
  />
)
