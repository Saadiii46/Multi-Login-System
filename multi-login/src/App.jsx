import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Registration } from './pages/RegisterPage'
import { Dashboard } from './pages/DashboardPage'
import { Login } from './pages/Login'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = "/register" element = { <Registration /> } />
          <Route path = "/dashboard/:username/:schoolName" element = { <Dashboard /> } />
          <Route path = "/" element = { <Login /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
