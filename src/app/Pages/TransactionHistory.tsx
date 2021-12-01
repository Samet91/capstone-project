import React from 'react'
import type { TransactionProps } from '../../types'
import TransactionOverview from '../components/TransactionOverview/TransactionOverview'
import useLocalStorage from '../hooks/useLocalStorage'

export default function TransactionHistory(): JSX.Element {
  const [transactions, setTransactions] = useLocalStorage<TransactionProps[]>(
    'transactions',
    []
  )

  function handleDeleteTransaction(id: number) {
    const newTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    )
    setTransactions(newTransactions)
  }

  return (
    <div>
      <TransactionOverview
        transactions={transactions}
        deleteTransaction={handleDeleteTransaction}
      />
    </div>
  )
}
