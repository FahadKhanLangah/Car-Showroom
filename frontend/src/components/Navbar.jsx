import carLogo from '../assets/car_logo.jpg';
import { IoClose, IoCarSport, IoPeople, IoAnalytics, IoAddCircle } from "react-icons/io5";
import { FiUser, FiLogOut } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';
import { FaJediOrder } from 'react-icons/fa6';

const Navbar = ({ showNav, setShowNav }) => {
  const { user } = useSelector(v => v.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const navItems = [
    {
      icon: <FiUser className="mr-3" />,
      label: 'View Profile',
      action: () => navigate('/profile'),
      forAdmin: false
    },
    {
      icon: <IoCarSport className="mr-3" />,
      label: user?.role === 'admin' ? 'All Cars' : 'My Cars',
      action: () => navigate(user?.role === 'admin' ? '/all-cars' : '/my-cars'),
      forAdmin: false
    },
    {
      icon: <IoPeople className="mr-3" />,
      label: 'All Users',
      action: () => navigate('/all-users'),
      forAdmin: true
    },
    {
      icon: <IoAddCircle className="mr-3" />,
      label: 'Add Vehicle',
      action: () => navigate('/add-car'),
      forAdmin: true
    },
    {
      icon: <FaJediOrder className="mr-3" />,
      label: 'All Orders',
      action: () => navigate('/order-dashboard'),
      forAdmin: true
    },
    {
      icon: <IoAnalytics className="mr-3" />,
      label: 'Admin Analytics',
      action: () => navigate('/admin-analytics'),
      forAdmin: true
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {showNav && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setShowNav(!showNav)}
        />
      )}

      {/* Navbar Container */}
      <div className={`
        fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-gray-900 to-gray-800
        text-white shadow-2xl z-50 transform transition-all duration-300 ease-in-out
        ${showNav ? 'translate-x-0' : '-translate-x-full'}
        flex flex-col
      `}>
        {/* Close Button (Mobile Only) */}
        <button
          onClick={() => setShowNav(!showNav)}
          className="absolute top-4 w-5 right-4 text-2xl text-gray-400 hover:text-white transition-colors"
        >
          <IoClose />
        </button>

        {/* User Profile Section */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex flex-col items-center">
            <img
              className="h-20 w-20 rounded-full border-2 border-blue-500 object-cover mb-3"
              src={user?.avatar || carLogo}
              alt="Profile"
            />
            <h2 className="text-xl font-semibold text-center">{user?.name}</h2>
            {user?.role === 'admin' && (
              <span className="mt-1 px-2 py-1 bg-blue-600 text-xs rounded-full">
                ADMIN
              </span>
            )}
            <p className="text-gray-400 text-sm mt-2">
              Joined {formatDate(user?.createdAt)}
            </p>
          </div>
        </div>

        {/* Scrollable Navigation Links */}
        <div className="flex-1 py-2">
          {navItems
            .filter(item => user?.role === 'admin' ? true : !item.forAdmin)
            .map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.action();
                  setShowNav(!showNav);
                }}
                className="w-full flex items-center px-6 lg:py-2 py-3 mb-1 text-left rounded-lg
                hover:bg-blue-600 hover:bg-opacity-30 hover:text-blue-400
                transition-all duration-200"
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
        </div>

        {/* Fixed Logout Button at Bottom */}
        <div className="border-t border-gray-800">
          <button
            onClick={() => {
              dispatch(logoutUser());
              setShowNav(false);
            }}
            className="w-full p-4 flex items-center justify-center px-6 py-1 rounded-lg
            bg-red-600 hover:bg-red-800 bg-opacity-20 hover:bg-opacity-30 text-white
            transition-all duration-200"
          >
            <FiLogOut className="mr-3" />
            <span>Logout</span>
          </button>
        </div>

        {/* Footer */}
        <div className="pb-4 text-center text-xs text-gray-500 border-t border-gray-800">
          © {new Date().getFullYear()} Car Marketplace
        </div>
      </div>
    </>
  );
};

export default Navbar;