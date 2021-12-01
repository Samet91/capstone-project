import React from 'react'
import type { Costs } from '../../types'
import CostsForm from '../components/CostsForm/CostsForm'
import useLocalStorage from '../hooks/useLocalStorage'

export default function AddCosts(): JSX.Element {
  const [cost, setCost] = useLocalStorage<Costs[] | null>('cost', null)

  function handleSubmit(costs: Costs): void {
    const newCosts = costs
    if (cost) {
      setCost([...cost, newCosts])
    } else {
      setCost([newCosts])
    }
  }

  return (
    <main>
      <CostsForm onSubmit={handleSubmit} />
    </main>
  )
}
