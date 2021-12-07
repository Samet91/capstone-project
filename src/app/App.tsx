import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Login from './Pages/Login'
import Register from './Pages/Register'
import TransactionHistory from './Pages/TransactionHistory'

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="Login" element={<Login />} />
        <Route path="Register" element={<Register />} />
        <Route path="Transaction" element={<TransactionHistory />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
