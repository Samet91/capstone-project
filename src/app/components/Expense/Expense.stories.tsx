import React from 'react'
import Expense from './Expense'

export default {
  title: 'Component/Expense',
  component: Expense,
}

export const Standard = (): JSX.Element => <Expense income={0} expense={0} />
