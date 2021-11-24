import React from 'react'
import styled from 'styled-components'

type inOutProps = {
  income: number
  expense: number
}

export default function Expense({ income, expense }: inOutProps): JSX.Element {
    

  return (
    <>
      <BalanceTitle>Bilanz</BalanceTitle>
      <Balance income={income} expense={expense}>
        €{income - expense}
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

const BalanceTitle = styled.h2`
  display: flex;
  justify-content: center;
  color: black;
`

const Balance = styled.h2<inOutProps>`
  display: flex;
  justify-content: center;
  margin-top: -20px;
  font-weight: 400;
  line-height: 1.167;
  font-size: 3rem;
  color: ${(props) => (props.income - props.expense < 0 ? 'red' : 'green')};
`

const IncExpContainer = styled.div`
  display: flex;
  margin-top: -20px;
`

const IncomeContainer = styled.div`
  flex: 1 1;
  background-color: rgb(20 20 41 / 50%) !important;
  color: #f5f5f5 !important;
  padding: 10px;
  border-radius: 10px;
  margin-right: 5px;
`

const ExpenseContainer = styled.div`
  flex: 1 1;
  background-color: rgb(20 20 41 / 50%);
  color: #f5f5f5;
  padding: 10px;
  border-radius: 10px;
  margin-left: 5px;
`

const IncomeTitle = styled.span`
  color: black;
`

const IncomePlace = styled.h2`
  color: black;
`

const ExpenseTitle = styled.span`
  color: black;
  align-content: center;
`

const ExpensePlace = styled.h2`
  color: black;
`
