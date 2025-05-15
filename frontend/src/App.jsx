import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import MyOrders from './pages/MyOrders';
import Footer from './components/Footer';
import { useSelector } from 'react-redux';
import NotAuthorized from './pages/NotAuthorized';
import Loader from './components/Loader';

const App = () => {
  const ProtectedRoute = ({ children, requiredRole }) => {
    const { user , isLoading } = useSelector(v => v.auth);
    if (isLoading) {
      return <Loader></Loader>
    }
    if (requiredRole && user?.role !== requiredRole) {
      return <Navigate to="/not-authorized" replace />;
    }
    if (!user) {
      return <Navigate to="/auth" replace />;
    }
    return children;
  };
  return (
    <><ToastContainer position="top-right" />
      <BrowserRouter>
        <PersistAuth></PersistAuth>
        <Routes>
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path='/' element={<Home />} ></Route>
          <Route path='/car/:id' element={<CarCard />} ></Route>
          <Route path='/add-car' element={<AddCar />}></Route>
          <Route path='/auth' element={<AuthForm />}></Route>
          <Route path='/search-results' element={<VehicleSearchResults />}></Route>
          <Route path='/profile' element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path='/admin-analytics' element={
            <ProtectedRoute requiredRole='admin'>
              <AdminAnalytics
              />
            </ProtectedRoute>} />
          <Route path='/order-dashboard' element={
            <ProtectedRoute requiredRole='admin'>
              <OrdersDashboard />
            </ProtectedRoute>} />
          <Route path='/all-users' element={
            <ProtectedRoute requiredRole='admin'>
              <UserManagementTable />
            </ProtectedRoute>} />
          <Route path='/all-cars' element={
            <ProtectedRoute requiredRole='admin'>
              <CarInventoryTable />
            </ProtectedRoute>} />
          <Route path='/my-cars' element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </>
  )
}

export default App