import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import UserForm from '../components/UserForm/UserForm'

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
      <Header>Einloggen</Header>
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
  padding: 20px;
  height: 100vh;
`

export const Header = styled.header`
  display: flex;
  justify-content: center;
  font-family: initial;
  font-size: xx-large;
`

export const LinkContainer = styled.div`
  align-self: center;
`
