import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => localStorage.getItem('expense_token') ? children : <Navigate to="/login" replace />


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element = {<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
