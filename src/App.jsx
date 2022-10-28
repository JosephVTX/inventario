import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.min.css";
import { Login } from './components/login/Login';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import { Products } from './components/products/Products'

const App = () => {
  return (
    <Router>
     
     <Routes>
  
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute/>}>
              <Route path="/" element={<Products/>} />
        </Route>

     </Routes>
      <ToastContainer />
    </Router>
  )
}

export default App