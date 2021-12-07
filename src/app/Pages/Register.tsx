import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserForm from '../components/UserForm/UserForm'
import { Container, Header, LinkContainer } from './Login'

export default function Register(): JSX.Element {
  const navigate = useNavigate()

  async function handleSubmit(username: string, password: string) {
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    if (response.status === 201) {
      navigate('/login')
    } else {
      alert('Benutzer vorhanden! Bitte einen neuen Benutzernamen auswählen')
    }
  }

  return (
    <Container>
      <Header>Registrieren</Header>
      <UserForm type="Register" onSubmit={handleSubmit} />
      <LinkContainer>
        <Link to="/login">Login</Link>
      </LinkContainer>
    </Container>
  )
}
