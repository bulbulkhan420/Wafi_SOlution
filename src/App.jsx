import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Task from './Task'
import Register from './Register'

import Update from './Update'
import Employee from './Employee'
function App() {
 
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Task/>}></Route>
      <Route path='/employee' element={<Employee/>}></Route>
      <Route path='/add' element={<Register/>}></Route>
      <Route path='/edit/:email' element={<Update/>}></Route>
    </Routes>
    </BrowserRouter>
  
    </>
  )
}

export default App
