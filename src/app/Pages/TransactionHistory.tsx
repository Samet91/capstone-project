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
        <StyledButton>
          <Icon>
            <ArrowIconRight />
          </Icon>
          <ButtonText>Startseite</ButtonText>
        </StyledButton>
      </Link>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 60px;
`

const StyledButton = styled(Button)`
  font-weight: bold;
  font-size: 1rem;
  background-color: steelblue;
  border: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  border: none;
  grid-template-rows: 25px auto;
`

const Icon = styled.span`
  margin-left: -40px;
  transform: rotateY(180deg);
`

const ButtonText = styled.span`
  align-self: center;
  line-height: 1.6;
  letter-spacing: 0.1em;
  grid-column: 5/6;
`
