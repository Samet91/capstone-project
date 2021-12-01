import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddCosts from './Pages/TransactionHistory'
import Dashboard from './Pages/Dashboard'

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="AddCosts" element={<AddCosts />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
