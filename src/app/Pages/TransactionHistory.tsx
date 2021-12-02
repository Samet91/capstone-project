import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import type { TransactionProps } from '../../types'
import Button from '../components/Button/Button'
import ArrowIconRight from '../components/Icons/ArrowIconRight'
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
    <Container>
      <TransactionOverview
        transactions={transactions}
        deleteTransaction={handleDeleteTransaction}
      />
      <Link to="/">
        <BackButton>
          <Icon>
            <ArrowIconRight />
          </Icon>
        </BackButton>
      </Link>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 60px;
`

const BackButton = styled(Button)`
  font-weight: bold;
  font-size: 1rem;
  background-color: steelblue;
  border: none;
  display: grid;
`

const Icon = styled.span`
  transform: rotateY(180deg);
`
