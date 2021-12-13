import React from 'react'
import styled from 'styled-components'
import TrashIcon from '../Icons/TrashIcon'

import type { Transaction } from '../../../types'

export type InitialStateType = {
  transactions: Transaction[]
  deleteTransaction: (id: number) => void
}

export default function TransactionOverview({
  deleteTransaction,
  transactions,
}: InitialStateType): JSX.Element {
  return (
    <Section>
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
            .map((transaction: Transaction) => (
              <Li key={transaction.id} type={transaction.type}>
                <Date>{transaction.date}</Date>
                <span>{transaction.category}</span>

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
    </Section>
  )
}

const Section = styled.section`
  display: grid;
  grid-template-rows: 80px auto;
`

const TransList = styled.ul`
  padding: 0;
`

const H2 = styled.h2`
  font-size: 1.25rem;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  line-height: 1.6;
  letter-spacing: 0.15em;
  color: #131111;
  background-color: steelblue;
  padding: 5px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
`

const Li = styled.li<Partial<Transaction>>`
  list-style: none;
  display: flex;
  justify-content: space-between;
  margin-top: 0.5em;
  background-color: #12151b;
  padding: 1.5em;
  border-radius: 5px;
  color: ${(props) => (props.type === 'income' ? 'green' : 'red')};
`

const Date = styled.span`
  color: aquamarine;
`

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
