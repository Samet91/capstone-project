import React from 'react'
import Expense from '../Expense/Expense'
import TransactionForm from '../TransactionForm/TransactionForm'

import type { TransactionProps } from '../../../types'
import TransactionOverview from '../TransactionOverview/TransactionOverview'
import useLocalStorage from '../../hooks/useLocalStorage'

export default function CompletePage(): JSX.Element {
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
