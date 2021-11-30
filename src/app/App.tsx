import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AddTodo from './Pages/AddTodo'
import Dashboard from './Pages/Dashboard'

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="addTodo" element={<AddTodo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
