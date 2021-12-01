import React, { useState } from 'react'
import type { Costs } from '../../../types'
import Button from '../Button/Button'

type CostsFormProps = {
  onSubmit: (costs: Costs) => void
}

export default function CostsForm({ onSubmit }: CostsFormProps): JSX.Element {
  const [title, setTitle] = useState<string>('')
  const [amount, setAmount] = useState<number>(0)
  const [date, setDate] = useState<string>('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit({ title, amount, date })
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <label>
        Titel{' '}
        <input
          type="text"
          maxLength={30}
          required
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>
      <label>
        Betrag{' '}
        <input
          type="number"
          maxLength={10}
          required
          value={amount}
          onChange={(event) => setAmount(event.target.valueAsNumber)}
        />
      </label>
      <label>
        Datum{' '}
        <input
          type="datetime-local"
          max={'2025-12-31T23:59'}
          required
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </label>
      <Button>Kosten anzeigen</Button>
    </form>
  )
}
