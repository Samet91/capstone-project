import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserForm from '../components/UserForm/UserForm'
import { Container, LinkContainer } from './Login'
import logo from '../../images/logo.png'

export default function Register(): JSX.Element {
  const navigate = useNavigate()

  async function handleSubmit(username: string, password: string) {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    if (response.status === 201) {
      navigate('/')
    } else {
      alert('Benutzer vorhanden! Bitte einen neuen Benutzernamen auswählen')
    }
  }

  return (
    <Container>
      <img src={logo} width="100%" />
      <UserForm type="Registrieren" onSubmit={handleSubmit} />
      <LinkContainer>
        <Link to="/">Login</Link>
      </LinkContainer>
    </Container>
  )
}
