import React, { useState } from 'react'
import { idGenerator } from '../Utils'
import styled from 'styled-components'
import type { Transaction } from '../../../types'

type TransactionFormProps = {
  onNewTransaction: (data: Transaction) => void
}

export default function TransactionForm({
  onNewTransaction,
}: TransactionFormProps): JSX.Element {
  const [category, setCategory] = useState<string>('')
  const [amount, setAmount] = useState<number>(0)
  const [date, setDate] = useState<string>('')

  function addTransaction(
    type: string,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    date: string
  ) {
    event.preventDefault()

    const data = {
      id: idGenerator(),
      category: category,
      amount: amount,
      type: type,
      date: date,
    }
    onNewTransaction(data)

    setCategory('')
    setAmount(0)
    setDate('')
  }

  return (
    <div>
      <H2>Transaktion</H2>
      <form>
        <CatContainer>
          <Input
            type="text"
            placeholder="Kategorie.."
            maxLength={20}
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />

          {!category ? <Warning>Bitte Kategorie hinzufügen!</Warning> : ''}
        </CatContainer>
        <AmountContainer>
          <Input
            type="number"
            placeholder="Betrag.."
            maxLength={8}
            value={amount}
            onChange={(event) =>
              setAmount(Math.abs(parseFloat(event.target.value)))
            }
          />

          {!amount ? <Warning>Bitte Betrag hinzufügen!</Warning> : ''}
        </AmountContainer>
        <AmountContainer>
          <Input
            type="date"
            placeholder="Betrag.."
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />

          {!date ? <Warning>Bitte Datum hinzufügen!</Warning> : ''}
        </AmountContainer>
        <ButtonContainer>
          <ButtonIncome
            onClick={(event) => addTransaction('income', event, date)}
          >
            Einnahmen
          </ButtonIncome>
          <ButtonExpense
            onClick={(event) => addTransaction('expense', event, date)}
          >
            Ausgaben
          </ButtonExpense>
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
  margin: 40px 0 0;
  color: var(--font-middle-blue-green);
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
  border-color: var(--font);
  border-radius: 5px;
`

const ButtonContainer = styled.div`
  margin: 16px 0px 20px;
`

const ButtonIncome = styled.button`
  width: 49%;
  color: #121a12;
  background-color: var(--font-neon-green);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  letter-spacing: 0.3em;
  font-weight: bold;
`

const ButtonExpense = styled.button`
  width: 49%;
  margin-left: 2%;
  color: var(--font);
  background-color: var(--font-max-red);
  border: none;
  padding: 5px;
  border-radius: 5px;
  letter-spacing: 0.3em;
  font-weight: bold;
  padding: 0.5rem 1rem;
`

const Warning = styled.span`
  color: var(--font-dark-salmon);
  font-size: 0.7em;
`
