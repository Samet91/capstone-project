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
      <Header>TRANSAKTIONEN</Header>

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
  grid-template-rows: 60px auto;
  height: 100vh;
`

const Header = styled.div`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  line-height: 1.8;
  letter-spacing: 0.15em;
  background-color: var(--font-steelblue);
  padding: 10px;
  position: sticky;
  top: 0;
`

const TransList = styled.ul`
  padding: 0;
  overflow-y: auto;
`

const Li = styled.li<Partial<Transaction>>`
  list-style: none;
  display: flex;
  justify-content: space-between;
  margin-top: 0.5em;
  background-color: #2e1d1d;
  padding: 1.5em;
  border-radius: 5px;
  color: ${(props) => (props.type === 'income' ? 'green' : 'red')};
`

const Date = styled.span`
  color: aquamarine;
  margin-left: -10px;
`

const Icon = styled.div`
  display: inline-block;
  margin: 0 -15px 0 10px;
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
  color: var(--font-max-red);
`
