import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import type { Transaction } from '../../types'
import TransactionOverview from '../components/TransactionOverview/TransactionOverview'
import useFetch from '../hooks/useFetch'
import { HiChevronDoubleLeft, HiLogout } from 'react-icons/hi'
import logoKreis from '../../images/logoKreis.png'

export default function TransactionHistory(): JSX.Element {
  const { username } = useParams()
  const navigate = useNavigate()

  const [transactions, refetchTransactions] = useFetch<Transaction[]>(
    `/api/costs/${username}`
  )

  async function handleDeleteTransaction(id: number) {
    const response = await fetch(`/api/delete/${username}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      console.log('deleted in database')
      refetchTransactions()
    } else {
      console.log('delete has not worked')
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
        {transactions && (
          <TransactionOverview
            transactions={transactions}
            deleteTransaction={handleDeleteTransaction}
          />
        )}
      </Main>
      <Nav>
        <Link to={`/${username}`}>
          <BackIcon />
        </Link>
        <Logo>
          <img src={logoKreis} height={35} />
        </Logo>
        <LogoutIcon onClick={() => handleClick()} />
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
  overflow-x: hidden;
`
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: steelblue;
  margin: 0 -10px;
`
const BackIcon = styled(HiChevronDoubleLeft)`
  color: black;
  height: 1.5rem;
  width: 1.5rem;
`
const LogoutIcon = styled(HiLogout)`
  color: black;
  height: 1.5rem;
  width: 1.5rem;
`
const Logo = styled.span``
