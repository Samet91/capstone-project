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
                <Row1>
                  <Date>{transaction.date}</Date>

                  <Icon>
                    <TrashIcon
                      onClick={() => deleteTransaction(transaction.id)}
                    />
                  </Icon>
                </Row1>
                <Row2>
                  <CategoryText>{transaction.category}</CategoryText>
                  <Amount>
                    €{transaction.amount ? Math.abs(transaction.amount) : null}
                  </Amount>
                </Row2>
              </Li>
            ))}
        {transactions.length === 0 ? (
          <MissingTransactions>
            <NoTransactions>Keine Transaktionen vorhanden!</NoTransactions>
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
  padding-top: 15px;
  position: sticky;
  top: 0;
  text-align: center;
`

const TransList = styled.ul`
  padding: 0;
  overflow-y: scroll;
  margin: 5px 10px;
`

const Li = styled.li<Partial<Transaction>>`
  list-style: none;
  font-weight: 600;
  letter-spacing: 0.1em;
  margin-top: 0.5em;
  background-image: linear-gradient(to right, #9071ffeb, #2b919a);
  padding: 1.3em;
  border-radius: 5px;
  color: ${(props) => (props.type === 'income' ? '#1de01d' : '#7e1914')};
`

const Row1 = styled.li`
  display: flex;
  justify-content: space-between;
`

const Row2 = styled(Row1)`
  margin-bottom: -20px;
`

const Date = styled.span`
  color: #f7f2f2;
  margin: -10px;
  font-size: 0.7rem;
`

const Icon = styled.div`
  display: inline-block;
  margin: -10px -15px 0 10px;
`

const Amount = styled.span`
  margin: 10px -15px;
`
const CategoryText = styled.span`
  margin: 10px -10px;
  font-size: 1.1rem;
`

const MissingTransactions = styled.article`
  display: flex;
  justify-content: center;
`

const NoTransactions = styled.h3`
  font-family: monospace;
  font-size: 1rem;
`
