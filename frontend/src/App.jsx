import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CarCard from './pages/CarCard';
import AddCar from './pages/AddCar';
import AuthForm from './pages/AuthForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './pages/Profile';
import PersistAuth from './components/PersistAuth';
import AdminAnalytics from './pages/AdminAnalytics';
import OrdersDashboard from './components/admin/OrdersDashboard';
import { VehicleSearchResults } from './pages/VehicleSearchResults';
import { UserManagementTable } from './pages/UserManagementTable';
import CarInventoryTable from './components/admin/CarInventoryTable';

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
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/admin-analytics' element={<AdminAnalytics />}></Route>
          <Route path='/order-dashboard' element={<OrdersDashboard />} />
          <Route path='/search-results' element={<VehicleSearchResults/>} />
          <Route path='/all-users' element={<UserManagementTable/>} />
          <Route path='/all-cars' element={<CarInventoryTable/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App