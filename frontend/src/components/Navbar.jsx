import carLogo from '../assets/car_logo.jpg'
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';
const Navbar = ({ showNav, setShowNav }) => {
  const { user } = useSelector(v => v.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className={`absolute sm:left-0 left-0 transition-all ease-in-out duration-300 bg-gray-900 text-white rounded-r-xl sm:top-16 top-28 py-6 min-w-52 ${showNav ? '' : '-translate-x-full'}`}>
      <div className='flex justify-center flex-col px-1 gap-3 items-center my-3'>
        <img className='h-16 w-16 rounded-full cursor-pointer mb-3' src={user ? user?.avatar : carLogo} alt="" />
        <button onClick={() => navigate('/profile')} className='bg-gray-700 w-full px-2 py-1 rounded cursor-pointer hover:bg-blue-500 duration-300 transition-all'>View Profile</button>
        <button className='bg-gray-700 w-full px-2 py-1 rounded cursor-pointer hover:bg-blue-500 duration-300 transition-all'>My Cars</button>
        <Link className='w-full' to={'/order-dashboard'}> <button className='bg-gray-700 w-full px-2 py-1 rounded cursor-pointer hover:bg-blue-500 duration-300 transition-all'>Orders</button></Link>
        <Link className='w-full' to={'/add-car'}><button className='bg-gray-700 w-full px-2 py-1 rounded cursor-pointer hover:bg-blue-500 duration-300 transition-all'>   Add Vehicle </button></Link>
        <Link className='w-full' to={'/admin-analytics'}><button className='bg-gray-700 w-full px-2 py-1 rounded cursor-pointer hover:bg-blue-500 duration-300 transition-all'>   Admin Analysis </button></Link>
        <button onClick={() => dispatch(logoutUser())} className='bg-gray-700 w-full px-2 py-1 rounded cursor-pointer hover:bg-blue-500 duration-300 transition-all'>Logout </button>
        <p>Joined Since <br /> 23 oct, 2025</p>
        <button onClick={() => setShowNav(!showNav)} className='cursor-pointer text-3xl hover:text-red-500'>
          <IoClose></IoClose>
        </button>
      </div>
    </div>
  )
}

export default Navbar
