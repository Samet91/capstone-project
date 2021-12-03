import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import type { TransactionProps } from '../../types'
import Button from '../components/Button/Button'
import ArrowIconRight from '../components/Icons/ArrowIconRight'
import TransactionOverview from '../components/TransactionOverview/TransactionOverview'

export default function TransactionHistory(): JSX.Element {
  const [transactions, setTransactions] = useState<TransactionProps[]>([])

  async function handleDeleteTransaction(id: number) {
    const newTransactions = transactions.filter(
      (transaction) => transaction._id !== id
    )
    setTransactions(newTransactions)
    const response = await fetch(`/delete/${id}`, {
      method: 'DELETE',
    })
    if (response.status === 200) {
      console.log('deleted in database')
    } else {
      console.log('sry Kollege, mach das ordentlich')
    }
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
