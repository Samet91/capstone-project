import React, { useState } from 'react'
import { idGenerator } from '../Utils'
import styled from 'styled-components'

export type Transaction = {
  id: number
  category: string
  amount: number
  type: string
}

type TransactionFormProps = {
  onNewTransaction: (data: Transaction) => void
}

export default function TransactionForm({
  onNewTransaction,
}: TransactionFormProps): JSX.Element {
  const [category, setCategory] = useState<string>('')
  const [amount, setAmount] = useState<number>(0)

  function addTransaction(
    type: string,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault()

    const data = {
      id: idGenerator(),
      category: category,
      amount: amount,
      type: type,
    }
    onNewTransaction(data)

    setCategory('')
    setAmount(0)
  }

  return (
    <div>
      <H2>Transaktion:</H2>
      <form>
        <CatContainer>
          <Input
            type="text"
            placeholder="Kategorie.."
            required
            maxLength={15}
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
        </CatContainer>
        <AmountContainer>
          <Input
            type="number"
            placeholder="Betrag.."
            required
            maxLength={8}
            value={amount}
            onChange={(event) =>
              setAmount(Math.abs(parseFloat(event.target.value)))
            }
          />
        </AmountContainer>
        <ButtonContainer>
          <Button onClick={(event) => addTransaction('income', event)}>
            Einnahmen
          </Button>
          <Button onClick={(event) => addTransaction('expense', event)}>
            Ausgaben
          </Button>
        </ButtonContainer>
      </form>
    </div>
  )
}

const H2 = styled.h2`
  font-size: 1.25rem;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  line-height: 1.6;
  letter-spacing: 0.1em;
  margin: 0;
  color: #131111;
`

const CatContainer = styled.div`
  display: inline-flex;
  position: relative;
  min-width: 0;
  flex-direction: column;
  vertical-align: top;
  margin-top: 10px;
  width: 100%;
`

const AmountContainer = styled.div`
  display: inline-flex;
  position: relative;
  min-width: 0;
  flex-direction: column;
  vertical-align: top;
  margin-top: 10px;
  width: 100%;
`

const Input = styled.input`
  padding: 10px;
  outline: none;
  border-color: aliceblue;
  border-radius: 5px;
`

const ButtonContainer = styled.div`
  margin: 16px 0px 0px;
`

const Button = styled.button`
  width: 50%;
  padding: 5px;
`
