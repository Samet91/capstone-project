import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import UserForm from '../components/UserForm/UserForm'
import headerLogo from '../../images/headerLogo.png'

export default function Login(): JSX.Element {
  const navigate = useNavigate()
  async function handleSubmit(username: string, password: string) {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    if (response.status === 200) {
      navigate(`/${username}`)
    } else {
      alert('Anmeldung fehlgeschlagen')
    }
  }

  return (
    <Container>
      <img src={headerLogo} width="100%" />
      <StyledHeadline>Log dich ein und los gehts...</StyledHeadline>
      <UserForm type="Login" onSubmit={handleSubmit} />
      <LinkContainer>
        <Link to="/register">Registrieren</Link>
      </LinkContainer>
    </Container>
  )
}

export const Container = styled.div`
  display: grid;
  justify-items: center;
  align-content: start;
  gap: 20px;
  margin: 30px;
  height: 90vh;
  background-color: #83c5be;
  border: 4px solid var(--font);
`

export const LinkContainer = styled.div`
  align-self: center;
  color: var(--font);
`

const StyledHeadline = styled.p`
  font-size: 2em;
  font-weight: 700;
  text-align: center;
  padding: 0 20px;
`
