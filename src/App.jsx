import { useContext, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthContext } from './auth/context/AuthContext'
import { LoginPage } from './auth/pages/LoginPage';
import { HomeRoutes } from './routes/HomeRoutes';
import { Navbar } from './components/generic/NavBar';

function App() {
  const { login } = useContext(AuthContext);
  return (
    <>
      <Navbar />
      <Routes>
        {
          login.isAuth ? 
            <Route path='/*' element={<HomeRoutes />} />
          :
          <>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/*' element={<Navigate to="/login" /> } />
          </>
        }
      </Routes>
    </>
  )
}

export default App
