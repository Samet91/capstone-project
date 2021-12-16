import React, { useEffect, useState } from 'react'
import TransactionForm from '../components/TransactionForm/TransactionForm'
import Expense from '../components/Expense/Expense'

import type { Transaction } from '../../types'
import styled from 'styled-components'
import logoKreis from '../../images/logoKreis.png'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { HiChevronDoubleRight, HiLogout } from 'react-icons/hi'
import { Logo } from './TransactionHistory'
import useFetch from '../hooks/useFetch'

export default function Dashboard(): JSX.Element {
  const navigate = useNavigate()
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

  async function handleClick() {
    await fetch('/api/logout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    navigate('/')
  }

  return (
    <Container>
      <Main>
        <Expense income={income} expense={expense} />

        <TransactionForm onNewTransaction={handleNewTransaction} />
      </Main>
      <Nav>
        <LogoutIcon onClick={() => handleClick()} />
        <Logo src={logoKreis} height={50} />
        <Link to="Transaction">
          <TransactionPageIcon />
        </Link>
      </Nav>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 60px;
  height: 100vh;
`
const Main = styled.main`
  overflow-y: auto;
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: var(--font-steelblue);
  margin: 0 -10px;
`

const TransactionPageIcon = styled(HiChevronDoubleRight)`
  color: black;
  height: 1.5rem;
  width: 1.5rem;
`
const LogoutIcon = styled(HiLogout)`
  color: black;
  height: 1.5rem;
  width: 1.5rem;
  transform: rotateY(180deg);
`
