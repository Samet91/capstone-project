import React from 'react'
import styled from 'styled-components'

type inOutProps = {
  income: number
  expense: number
}

export default function ExpenseOverview({
  income,
  expense,
}: inOutProps): JSX.Element {
  return (
    <>
      <Balance income={income} expense={expense}>
        {income - expense}€
      </Balance>
      <IncExpContainer>
        <IncomeContainer>
          <IncomeTitle>Einnahmen</IncomeTitle>
          <IncomePlace>€{income}</IncomePlace>
        </IncomeContainer>
        <ExpenseContainer>
          <ExpenseTitle>Ausgaben</ExpenseTitle>
          <ExpensePlace>€{expense}</ExpensePlace>
        </ExpenseContainer>
      </IncExpContainer>
    </>
  )
}

const Balance = styled.h2<inOutProps>`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  line-height: 1.167;
  font-size: 3rem;
  color: ${(props) =>
    props.income - props.expense < 0
      ? 'var(--font-max-red)'
      : 'var(--font-neon-green);'};
  border: solid 3px
    ${(props) =>
      props.income - props.expense < 0
        ? 'var(--font-max-red)'
        : 'var(--font-neon-green);'};
  border-radius: 10px;
`

const IncExpContainer = styled.div`
  display: flex;
  margin-top: 20px;
`

const IncomeContainer = styled.div`
  flex: 1 1;
  background-color: rgb(20 20 41 / 50%);
  padding: 10px;
  border-radius: 10px;
  margin-right: 5px;
`

const ExpenseContainer = styled(IncomeContainer)`
  margin-left: 5px;
  margin-right: 0;
`

const IncomeTitle = styled.span`
  color: var(--font-neon-green);
`

const IncomePlace = styled.h2`
  color: var(--font-neon-green);
`

const ExpenseTitle = styled.span`
  color: var(--font-max-red);
`

const ExpensePlace = styled.h2`
  color: var(--font-max-red);
`
