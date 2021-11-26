import React, { useState } from 'react'
import Expense from '../Expense/Expense'
import TransactionForm from '../TransactionForm/TransactionForm'

import type { TransactionProps } from '../TransactionForm/TransactionForm'
import TransactionOverview from '../TransactionOverview/TransactionOverview'

export default function CompletePage(): JSX.Element {
  const [transactions, setTransactions] = useState<TransactionProps[]>([])

  function handleNewTransaction(transaction: TransactionProps) {
    const newTransactions = [...transactions, transaction]
    setTransactions(newTransactions)
  }

  const income = transactions
    .filter(({ type }) => type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  const expense = transactions
    .filter(({ type }) => type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  return (
    <>
      <Expense income={income} expense={expense} />
      <TransactionOverview transactions={transactions} />
      <TransactionForm onNewTransaction={handleNewTransaction} />
    </>
  )
}
