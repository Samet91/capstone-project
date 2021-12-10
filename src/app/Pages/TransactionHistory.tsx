import React from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import type { Transaction } from '../../types'
import Button from '../components/Button/Button'
import ArrowIconRight from '../components/Icons/ArrowIconRight'
import TransactionOverview from '../components/TransactionOverview/TransactionOverview'
import useFetch from '../hooks/useFetch'

export default function TransactionHistory(): JSX.Element {
  const { username } = useParams()

  const transactions = useFetch<Transaction[]>(`/api/costs/${username}`)

  async function handleDeleteTransaction(id: number) {
    const response = await fetch(`/api/delete/${id}/${username}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(response)
    if (response.ok) {
      console.log('deleted in database')
    } else {
      console.log('delete has not worked')
    }
  }

  return (
    <Container>
      {transactions && (
        <TransactionOverview
          transactions={transactions}
          deleteTransaction={handleDeleteTransaction}
        />
      )}
      <Link to={`/${username}`}>
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
