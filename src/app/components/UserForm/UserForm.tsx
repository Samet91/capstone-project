import React, { useState } from 'react'
import Button from '../Button/Button'
import styled from 'styled-components'

type UserFormProps = {
  type: 'Login' | 'Register'
  onSubmit: (username: string, password: string) => void
}

export default function UserForm({
  type,
  onSubmit,
}: UserFormProps): JSX.Element {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    onSubmit(username, password)
  }

  return (
    <Form onSubmit={(event) => handleSubmit(event)}>
      <InputContainer>
        <Label>
          Benutzername:
          <Input
            type="text"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Label>
        <Label>
          Passwort:
          <Input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Label>
      </InputContainer>
      <StyledButton>
        <Button>{type}</Button>
      </StyledButton>
    </Form>
  )
}

const Form = styled.form`
  display: grid;
  border: solid 5px green;
  border-radius: 10px;
  width: 80%;
`
const InputContainer = styled.div`
  margin: 5px;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  border-radius: 5px;
  padding: 5px;
`
const StyledButton = styled.button`
  background-color: #8ee9da;
  border: none;
  display: inline-block;
  width: 100%;
`
