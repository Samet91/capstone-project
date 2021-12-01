import React from 'react'
import styled from 'styled-components'
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
      <H2>TRANSAKTIONSHISTORY</H2>

      <ul>
        {transactions &&
          transactions.map((transaction: TransactionProps) => (
            <Li key={transaction.id} type={transaction.type}>
              <Date>{transaction.date}</Date>
              <CategoryTitle>{transaction.category}</CategoryTitle>

              <Amount>
                €{transaction.amount ? Math.abs(transaction.amount) : null} ,-
                <Icon>
                  <TrashIcon
                    onClick={() => deleteTransaction(transaction.id)}
                  />
                </Icon>
              </Amount>
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
  letter-spacing: 0.27em;
  margin-top: 20px;
  color: #131111;
  background-color: steelblue;
  padding: 5px;
  border-radius: 5px;
`

const Li = styled.li<Partial<TransactionProps>>`
  list-style: none;
  display: flex;
  justify-content: space-between;
  margin-left: -38px;
  margin-top: 5px;
  color: ${(props) => (props.type === 'income' ? 'green' : 'red')};
`

const Date = styled.span``

const CategoryTitle = styled.span``

const Icon = styled.div`
  display: inline-block;
`

const Amount = styled.span`
  display: flex;
`
