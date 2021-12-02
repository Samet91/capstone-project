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

      <TransList>
        {transactions &&
          transactions
            .sort((a, b) => {
              if (a.date > b.date) {
                return -1
              }
              if (a.date < b.date) {
                return 1
              }
              return 0
            })
            .map((transaction: TransactionProps) => (
              <Li key={transaction.id} type={transaction.type}>
                <Date>{transaction.date}</Date>
                <CategoryTitle>{transaction.category}</CategoryTitle>

                <Amount>
                  €{transaction.amount ? Math.abs(transaction.amount) : null}
                  <Icon>
                    <TrashIcon
                      onClick={() => deleteTransaction(transaction.id)}
                    />
                  </Icon>
                </Amount>
              </Li>
            ))}
        {transactions.length === 0 ? (
          <MissingTransactions>
            <H3>Keine Transaktionen vorhanden!</H3>
          </MissingTransactions>
        ) : (
          ''
        )}
      </TransList>
    </div>
  )
}

const TransList = styled.ul`
  padding: 0;
`

const H2 = styled.h2`
  font-size: 1.25rem;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  line-height: 1.6;
  letter-spacing: 0.15em;
  margin-top: 20px;
  color: #131111;
  background-color: steelblue;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
`

const Li = styled.li<Partial<TransactionProps>>`
  list-style: none;
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  background-color: #12151b;
  padding: 10px;
  border-radius: 5px;
  color: ${(props) => (props.type === 'income' ? 'green' : 'red')};
`

const Date = styled.span`
  color: aquamarine;
`

const CategoryTitle = styled.span``

const Icon = styled.div`
  display: inline-block;
`

const Amount = styled.span`
  display: flex;
`

const MissingTransactions = styled.article`
  display: flex;
  justify-content: center;
`

const H3 = styled.h3`
  font-family: monospace;
  color: red;
`
