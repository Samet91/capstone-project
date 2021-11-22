import React from 'react'
import Expense from './Expense'

export default {
  title: 'Component/Expense',
  component: Expense,
}

export const Regular = (): JSX.Element => <Expense income={0} expense={0} />
