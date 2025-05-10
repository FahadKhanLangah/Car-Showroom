import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CarCard from './pages/CarCard';
import AddCar from './pages/AddCar';
import AuthForm from './pages/AuthForm';
import Dashboard from './pages/DashBoard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './pages/Profile';
import PersistAuth from './components/PersistAuth';
import AdminAnalytics from './pages/AdminAnalytics';
import OrdersDashboard from './components/admin/OrdersDashboard';
import { VehicleSearchResults } from './pages/VehicleSearchResults';

const App = () => {
  return (
    <><ToastContainer position="top-right" />
      <BrowserRouter>
        <PersistAuth></PersistAuth>
        <Routes>
          <Route path='/' element={<Home />} ></Route>
          <Route path='/car/:id' element={<CarCard />} ></Route>
          <Route path='/add-car' element={<AddCar />}></Route>
          <Route path='/auth' element={<AuthForm />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/admin-analytics' element={<AdminAnalytics />}></Route>
          <Route path='/order-dashboard' element={<OrdersDashboard />} />
          <Route path='/search-results' element={<VehicleSearchResults/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App