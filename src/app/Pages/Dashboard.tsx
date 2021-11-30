import React from 'react'
import TransactionForm from '../components/TransactionForm/TransactionForm'
import Expense from '../components/Expense/Expense'

import TransactionOverview from '../components/TransactionOverview/TransactionOverview'
import useLocalStorage from '../hooks/useLocalStorage'
import type { TransactionProps } from '../../types'
import Button from '../components/Button/Button'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ArrowIconRight from '../components/Icons/ArrowIconRight'

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
      <Link to="AddCosts">
        <StyledButton>
          <ButtonText>Fixkosten</ButtonText>
          <Icon>
            <ArrowIconRight />
          </Icon>
        </StyledButton>
      </Link>
    </>
  )
}

const StyledButton = styled(Button)`
  font-weight: bold;
  font-size: 1rem;
  background-color: steelblue;
  border: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`

const ButtonText = styled.span`
  align-self: center;
  line-height: 1.6;
  letter-spacing: 0.1em;
`

const Icon = styled.span`
  grid-column: 6/7;
  margin-right: -7px;
`
