import React from 'react'
import ExpenseOverview from './ExpenseOverview'

export default {
  title: 'Component/Expense',
  component: ExpenseOverview,
}

export const Standard = (): JSX.Element => (
  <ExpenseOverview income={0} expense={0} />
)
