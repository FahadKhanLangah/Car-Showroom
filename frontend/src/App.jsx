import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CarCard from './pages/CarCard';
import AddCar from './pages/AddCar';
import AuthForm from './pages/AuthForm';
import Dashboard from './pages/DashBoard';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} ></Route>
          <Route path='/car/:id' element={<CarCard />} ></Route>
          <Route path='/add-car' element={<AddCar/>}></Route>
          <Route path='/auth' element={<AuthForm/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App