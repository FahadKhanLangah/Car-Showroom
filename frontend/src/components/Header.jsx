import React, { useState } from 'react';
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { MdHome, MdMenu, MdClose } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { clearSearchResults, searchVehicles } from '../features/vehicles/vehiclesSlice';

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth, user } = useSelector(state => state.auth);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      dispatch(searchVehicles(search));
      navigate('/search-results');
    }
  };

  const handleLogoClick = () => {
    dispatch(clearSearchResults());
    setSearch("");
    navigate('/');
  };

  return (
    <>


      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-amber-500 to-amber-400 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo and Home Link */}
          <div className="flex items-center gap-2 space-x-4">
            <button
              onClick={() => setShowNav(!showNav)}
              className="fixed top-4 left-4 z-50 bg-gradient-to-r from-purple-600 to-blue-500 p-2 rounded-full shadow-lg text-white"
            >
              {showNav ? <MdClose size={24} /> : <MdMenu size={24} />}
            </button>
            <Link
              to="/"
              onClick={handleLogoClick}
              className="sm:ml-14 text-2xl font-bold text-white hidden sm:block"
            >
              DB Central Motors
            </Link>
          </div>

          {/* Search Bar */}
          <div className={`flex-1 max-w-2xl mx-4 transition-all duration-300 ${searchFocused ? 'scale-105' : ''}`}>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search your dream car..."
                className="w-full sm:ml-0 ml-4 py-2 px-4 pr-10 rounded-full  border-2 border-transparent focus:border-white focus:outline-none shadow-sm transition-all"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-600 hover:text-amber-700"
              >
                <FaSearch />
              </button>
            </form>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-4">
            {isAuth ? (
              <div className="relative group">
                <button
                  onClick={() => navigate('/profile')}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="relative">
                    <img
                      src={user?.avatar}
                      alt="Profile"
                      className="w-10 h-10 rounded-full border-2 border-white object-cover hover:border-amber-300 transition-all"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-3 h-3 border-2 border-white"></div>
                  </div>
                  <span className="hidden md:inline-block text-white font-medium">
                    {user?.name.split(' ')[0]}
                  </span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/auth')}
                className="bg-white text-amber-600 px-4 py-2 rounded-full font-medium hover:bg-amber-100 transition-colors flex items-center"
              >
                <FaUserCircle className="mr-2" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <Navbar showNav={showNav} setShowNav={setShowNav} />
    </>
  );
};

export default Header;