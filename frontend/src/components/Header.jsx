import React, { useState } from 'react'
import carLogo from '../assets/car_logo.jpg'
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const [search, setSearch] = useState("")
  const handleSearch = (e)=>{
    e.preventDefault();
    alert("Searched is clicked")
  }
  return (
    <div className='sm:h-20 relative flex sm:flex-row flex-col gap-2 sm:rounded-b-none rounded-b-lg sm:justify-between items-center bg-amber-500'>
      <Navbar showNav={showNav} setShowNav={setShowNav}></Navbar>
      <div className='flex px-2 sm:px-6 gap-6 mt-2 sm:mt-0 w-full'>
        <img onClick={()=>setShowNav(!showNav)} className='justify-items-start h-10 w-10 rounded-full cursor-pointer' src={carLogo} alt="CarLogo" />
        <Link to={'/'}><h3 className='text-3xl sm:ml-6 bg-none font-bold'>DB Central Motors</h3></Link>
      </div>
      <div className='mb-2 sm:mb-0 px-2 sm:px-6'>
        <form onSubmit={handleSearch} className='border-2 rounded-lg px-5 py-3 flex items-center justify-between'>
          <input value={search} onChange={e=>setSearch(e.target.value)} type="text" className='w-3xs font-semibold h-6 outline-none' placeholder='Search Your Favourite Car..' />
          <button type='submit' className='ml-2 cursor-pointer'>
            <FaSearch></FaSearch>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Header