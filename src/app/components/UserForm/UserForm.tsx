import React, { useState } from 'react'
import Button from '../Button/Button'
import styled from 'styled-components'

type UserFormProps = {
  type: 'Login' | 'Registrieren'
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
        <StyledButton>
          <Button>{type}</Button>
        </StyledButton>
      </InputContainer>
    </Form>
  )
}

const Form = styled.form`
  display: grid;
  border: solid 5px #e29578;
  border-radius: 10px;
  width: 80%;
  background-color: #e29578;
`
const InputContainer = styled.div`
  margin: 5px;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  color: var(--font);
  font-weight: 600;
`

const Input = styled.input`
  border-radius: 5px;
  padding: 5px;
`
const StyledButton = styled.span`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`
