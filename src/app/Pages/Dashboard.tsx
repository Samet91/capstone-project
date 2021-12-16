import React, { useEffect, useState } from 'react'
import TransactionForm from '../components/TransactionForm/TransactionForm'
import Expense from '../components/Expense/Expense'

import type { Transaction } from '../../types'
import Button from '../components/Button/Button'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import ArrowIconRight from '../components/Icons/ArrowIconRight'
import useFetch from '../hooks/useFetch'

export default function Dashboard(): JSX.Element {
  const { username } = useParams()
  const [transactions, refetchTransactions] = useFetch<Transaction[]>(
    `/api/costs/${username}`
  )
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)

  useEffect(() => {
    if (transactions && transactions.length > 0) {
      const newIncome = transactions
        .filter(({ type }) => type === 'income')
        .reduce((sum, transaction) => sum + transaction.amount, 0)
      setIncome(newIncome)
      const newExpense = transactions
        .filter(({ type }) => type === 'expense')
        .reduce((sum, transaction) => sum + transaction.amount, 0)
      setExpense(newExpense)
    }
  }, [transactions])

  async function handleNewTransaction(transaction: Transaction) {
    const response = await fetch(`/api/costs/${username}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    })

    if (response.status === 200) {
      console.log('added in database')
      refetchTransactions()
    } else {
      console.log('add to database did not work')
    }
  }

  return (
    <>
      <Expense income={income} expense={expense} />

      <TransactionForm onNewTransaction={handleNewTransaction} />
      <StyledLink to="Transaction">
        <StyledButton>
          <ButtonText>Übersicht</ButtonText>
          <Icon>
            <ArrowIconRight />
          </Icon>
        </StyledButton>
      </StyledLink>
    </>
  )
}

const StyledButton = styled(Button)`
  font-weight: bold;
  font-size: 1rem;
  background-color: #4485b9;
  border: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  margin-top: 50px;
`

const ButtonText = styled.span`
  align-self: center;
  line-height: 1.6;
  letter-spacing: 0.1em;
  color: black;
`

const Icon = styled.span`
  grid-column: 6/7;
  margin-right: -7px;
`
const StyledLink = styled(Link)`
  text-decoration: none;
`
