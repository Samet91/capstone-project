import React from 'react'
import Expense from './components/Expense/Expense'
import TransactionForm from './components/TransactionForm/TransactionForm'
// import TransactionForm from './components/Transaction/TransactionForm'

function App(): JSX.Element {
  return (
    <>
      <Expense income={0} expense={0} />
      <TransactionForm />
    </>
  )
}

export default App
