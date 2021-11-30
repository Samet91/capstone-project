import React from 'react'
import TransactionForm from '../components/TransactionForm/TransactionForm'
import Expense from '../components/Expense/Expense'

import TransactionOverview from '../components/TransactionOverview/TransactionOverview'
import useLocalStorage from '../hooks/useLocalStorage'
import type { TransactionProps } from '../../types'

export default function Dashboard(): JSX.Element {
  const [transactions, setTransactions] = useLocalStorage<TransactionProps[]>(
    'transactions',
    []
  )

  function handleNewTransaction(transaction: TransactionProps) {
    const newTransactions = [...transactions, transaction]
    setTransactions(newTransactions)
  }

  function handleDeleteTransaction(id: number) {
    const newTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    )
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
      <TransactionOverview
        transactions={transactions}
        deleteTransaction={handleDeleteTransaction}
      />
      <TransactionForm onNewTransaction={handleNewTransaction} />
    </>
  )
}
