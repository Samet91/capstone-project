import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Login from './Pages/Login'
import Register from './Pages/Register'
import TransactionHistory from './Pages/TransactionHistory'
import logo from '../images/logo.png'

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <img src={logo} width="100%" />
      <Routes>
        <Route path="/">
          <Route path=":username" element={<Dashboard />} />
          <Route
            path=":username/transaction"
            element={<TransactionHistory />}
          />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
