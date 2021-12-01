import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import TransactionHistory from './Pages/TransactionHistory'

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="Transaction" element={<TransactionHistory />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
