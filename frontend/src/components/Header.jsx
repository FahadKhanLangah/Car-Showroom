import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { clearSearchResults, searchVehicles } from '../features/vehicles/vehiclesSlice';
import { MdHome } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";
const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { isAuth } = useSelector(v => v.auth)
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      dispatch(searchVehicles(search));
    }
  };
  const navigate = useNavigate();
  const handleLogoClick = () => {
    setShowNav(!showNav);
    dispatch(clearSearchResults());
    setSearch("");
    navigate('/')
  };

  return (
    <div className='sm:h-20 relative flex sm:flex-row flex-col gap-2 sm:rounded-b-none rounded-b-lg sm:justify-between items-center bg-amber-500'>
      <Navbar showNav={showNav} setShowNav={setShowNav}></Navbar>

      <Link className='flex px-2 sm:px-6 gap-6 mt-2 sm:mt-0 w-full'
        to={'/'}
        onClick={() => {
          dispatch(clearSearchResults());
          setSearch("");
        }}
      >
        <span
          className='justify-items-start text-4xl rounded-full cursor-pointer'>
          <MdHome />
        </span>
        <h3 className='text-3xl sm:ml-6 bg-none font-bold'>DB Central Motors</h3>
      </Link>
      <div className='mb-2 sm:mb-0 px-2 sm:px-6 flex items-center gap-4'>
        <form onSubmit={handleSearch} className='border-2 rounded-lg px-5 py-3 flex items-center justify-between'>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            type="text"
            className='w-3xs font-semibold h-6 outline-none'
            placeholder='Search Your Favourite Car..'
          />
          <button type='submit' className='ml-2 cursor-pointer'>
            <FaSearch></FaSearch>
          </button>
        </form>
        {isAuth ?
          <div className='text-4xl cursor-pointer'>
            <IoPersonCircleOutline onClick={handleLogoClick} />
          </div> :
          <Link to={'/auth'}> <button className='hover:underline cursor-pointer'>Login</button></Link>
        }
      </div>
    </div>
  );
};

export default Header;