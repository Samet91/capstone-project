import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import type { Transaction } from '../../types'
import Button from '../components/Button/Button'
import ArrowIconRight from '../components/Icons/ArrowIconRight'
import TransactionOverview from '../components/TransactionOverview/TransactionOverview'
import useFetch from '../hooks/useFetch'

export default function TransactionHistory(): JSX.Element {
  const [transactions, refetch] = useFetch<Transaction[]>('/api/costs')

  async function handleDeleteTransaction(id: number) {
    const response = await fetch(`/api/delete/${id}`, {
      method: 'DELETE',
    })
    if (response.ok) {
      console.log('deleted in database')
    } else {
      console.log('sry Kollege, mach das ordentlich')
    }
    refetch()
  }

  return (
    <Container>
      {transactions && (
        <TransactionOverview
          transactions={transactions}
          deleteTransaction={handleDeleteTransaction}
        />
      )}
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
