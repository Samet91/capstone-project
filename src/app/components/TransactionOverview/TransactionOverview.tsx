import React from 'react'
import styled from 'styled-components'
import TrashIcon from '../Icons/TrashIcon'

import type { TransactionProps } from '../TransactionForm/TransactionForm'

export type InitialStateType = {
  transactions: TransactionProps[]
  deleteTransaction: (id: number) => void
}

export default function TransactionOverview({
  deleteTransaction,
  transactions,
}: InitialStateType): JSX.Element {
  return (
    <div>
      <h2>Überblick:</h2>

      <ul>
        {transactions.map((transaction: TransactionProps) => (
          <Li key={transaction.id}>
            <CategoryTitle>{transaction.category}</CategoryTitle>

            <span>
              {' '}
              €{Math.abs(transaction.amount)} ,-
              <Icon>
              <TrashIcon onClick={() => deleteTransaction(transaction.id)} />
              </Icon>
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

const Icon = styled.div`
margin-top: 10px;
  display: inline-block;

`
