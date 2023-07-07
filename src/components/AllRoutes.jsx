import React from 'react'
import {Routes, Route} from "react-router-dom";
import Home from '../pages/Home/Home';
import Signup from '../pages/Signup/Signup';
import Login from '../pages/Login/Login';

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={
        <Home />
        } />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default AllRoutes