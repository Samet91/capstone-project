import React from 'react'
import TransactionForm from './TransactionForm'

export default {
  title: 'Component/TransactionForm',
  component: TransactionForm,
}

export const Regular = (): JSX.Element => (
  <TransactionForm
    onNewTransaction={(data) => {
      data.category = 'Schuhe'
      data.amount = 50
      data.type = 'income'
    }}
  />
)
