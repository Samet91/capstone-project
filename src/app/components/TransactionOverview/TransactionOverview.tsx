import React from 'react'
import styled from 'styled-components'

import type { TransactionProps } from '../TransactionForm/TransactionForm'

export type InitialStateType = {
  transactions: TransactionProps[]
  deleteTransaction: (id:number) => void
}

export default function TransactionOverview({ deleteTransaction,
  transactions
}: InitialStateType): JSX.Element {
  return (
    <div>
      <h2>Überblick:</h2>

      <ul>
        {transactions.map((transaction: TransactionProps) => (
          <Li key={transaction.id} {...(transaction.amount < 0 ? '-' : '')}>
            <CategoryTitle>{transaction.category}</CategoryTitle>

            <span>
              {' '}
              €{Math.abs(transaction.amount)} ,-
              <Button onClick={() => deleteTransaction(transaction.id)}>
                X
              </Button>
            </span>
          </Li>
        ))}
      </ul>
    </div>
  )
}

const Li = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
`

const CategoryTitle = styled.span`
  margin-left: -40px;
`
const Button = styled.button`
  border: transparent;
`