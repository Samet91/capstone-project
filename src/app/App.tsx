import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddCosts from './Pages/AddTodo'
import Dashboard from './Pages/Dashboard'

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="addTodo" element={<AddCosts />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
