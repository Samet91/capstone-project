import React, { useState } from 'react'
import { idGenerator } from '../Utils'

type TransactionFormProps = {
  onNewTransaction: (data: {
    id: number
    category: string
    amount: number
    type: string
  }) => void
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
      <h2>Transaktion:</h2>
      <form>
        <input
          type="text"
          placeholder="Kategorie.."
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
        <input
          type="number"
          placeholder="Betrag.."
          value={amount}
          onChange={(event) =>
            setAmount(Math.abs(parseFloat(event.target.value)))
          }
        />
        <button onClick={(event) => addTransaction('income', event)}>
          Einnahmen
        </button>
        <button onClick={(event) => addTransaction('expense', event)}>
          Ausgaben
        </button>
      </form>
    </div>
  )
}

// const   = styled.`

// `

// const   = styled.`

// `

// const   = styled.`

// `

// const   = styled.`

// `

// const   = styled.`

// `

// const   = styled.`

// `
