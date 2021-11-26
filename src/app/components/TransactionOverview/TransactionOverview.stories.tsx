import React from 'react'
import TransactionOverview from './TransactionOverview'
import CompletePage from './TransactionOverview'

export default {
  title: 'Component/Completepage',
  component: CompletePage,
}

const example = [
  {
    id: 0,
    category: 'schuhe',
    amount: 30,
    type: 'expense',
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
