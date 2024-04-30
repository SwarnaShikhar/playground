import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/SignUp'
import Home from './components/Home'

const App = () => {

  const user = localStorage.getItem("token");

  return (
    <Routes>
      {user && <Route path="/" exact element={<Home />} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  )
}

export default App