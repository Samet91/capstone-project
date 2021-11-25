import React, { useState } from 'react'
import Expense from '../Expense/Expense'
import TransactionForm from '../TransactionForm/TransactionForm'

import type { Transaction } from '../TransactionForm/TransactionForm'

export default function CompletePage(): JSX.Element {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  function handleNewTransaction(transaction: Transaction) {
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

      <TransactionForm onNewTransaction={handleNewTransaction} />
    </>
  )
}
