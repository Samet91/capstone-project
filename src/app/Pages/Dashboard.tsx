import React from 'react'
import TransactionForm from '../components/TransactionForm/TransactionForm'
import Expense from '../components/Expense/Expense'

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

  async function handleNewTransaction(transaction: TransactionProps) {
    const newTransactions = [...transactions, transaction]
    setTransactions(newTransactions)
    const response = await fetch('/costs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    })
    if (response.status === 200) {
      console.log('added in database')
    } else {
      console.log('scheiße gelaufen')
    }
  }

  const income = transactions
    .filter(({ type }) => type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  const expense = transactions
    .filter(({ type }) => type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  return (
    <>
      <H2>Wie viel bleibt denn übrig?</H2>
      <Expense income={income} expense={expense} />

      <TransactionForm onNewTransaction={handleNewTransaction} />
      <Link to="Transaction">
        <StyledButton>
          <ButtonText>Übersicht</ButtonText>
          <Icon>
            <ArrowIconRight />
          </Icon>
        </StyledButton>
      </Link>
    </>
  )
}

const H2 = styled.h2`
  display: flex;
  justify-content: center;
  color: steelblue;
`

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
