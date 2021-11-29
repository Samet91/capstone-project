import React from 'react'
import styled from 'styled-components'
import ArrowIcon from '../Icons/ArrowIcon'
import TrashIcon from '../Icons/TrashIcon'

import type { TransactionProps } from '../../../types'

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
      <H2>
        Überblick
        <IconArrow>
          <ArrowIcon />
        </IconArrow>
      </H2>

      <ul>
        {transactions &&
          transactions.map((transaction: TransactionProps) => (
            <Li key={transaction.id}>
              <CategoryTitle>{transaction.category}</CategoryTitle>

              <span>
                €{transaction.amount ? Math.abs(transaction.amount) : null} ,-
                <Icon>
                  <TrashIcon
                    onClick={() => deleteTransaction(transaction.id)}
                  />
                </Icon>
              </span>
            </Li>
          ))}
      </ul>
    </div>
  )
}

const H2 = styled.h2`
  font-size: 1.25rem;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  line-height: 1.6;
  letter-spacing: 0.1em;
  margin-top: 20px;
  color: #131111;
  background-color: steelblue;
  padding: 5px;
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`

const IconArrow = styled.span`
  grid-column: 4/5;
  align-self: center;
`

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
