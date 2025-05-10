import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadUser, logoutUser } from '../features/auth/authSlice';
import { useEffect } from 'react';
import Header from '../components/Header';


const Profile = () => {
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state) => state.auth);
  const defaultAvatar = 'https://png.pngtree.com/png-clipart/20190924/original/pngtree-human-avatar-free-vector-png-image_4825373.jpg';
  useEffect(() => {
    if (!isAuth) {
      dispatch(loadUser())
    }
  }, [dispatch, isAuth])

  return (
    <>
    <Header></Header>
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white">My Profile</h1>
              <button
                onClick={() => dispatch(logoutUser())}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar Section */}
              <div className="md:w-1/3 flex flex-col items-center">
                <img
                  src={user?.avatar || defaultAvatar}
                  alt="Profile"
                  className="w-48 h-48 rounded-full object-cover border-4 border-purple-100 shadow-lg"
                />
                <Link
                  to="/profile/edit"
                  className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Edit Profile
                </Link>
              </div>

              {/* Details Section */}
              <div className="md:w-2/3 space-y-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-800">{user?.name}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoCard title="Email" value={user?.email} icon="email" />
                    <InfoCard title="Phone" value={user?.phone} icon="phone" />
                    <InfoCard title="City" value={user?.city} icon="location" />
                    <InfoCard title="Member Since" value={new Date(user?.createdAt).toLocaleDateString()} icon="calendar" />
                  </div>
                </div>
                {/* Address Section */}
                {user?.address && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9l-1.414-1.414m0 0l-4.243-4.243a4 4 0 010-5.656l4.243-4.243m4.242 4.242l-4.242-4.242M6.343 7.757L2.1 12l4.243 4.243m0 0l4.242 4.242M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Address
                    </h3>
                    <p className="text-gray-600">{user.address}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

const InfoCard = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
    <div className="flex items-center gap-2 mb-2">
      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {icon === 'email' && (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        )}
        {icon === 'phone' && (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        )}
        {icon === 'location' && (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9l-1.414-1.414m0 0l-4.243-4.243a4 4 0 010-5.656l4.243-4.243m4.242 4.242l-4.242-4.242M6.343 7.757L2.1 12l4.243 4.243m0 0l4.242 4.242M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        )}
        {icon === 'calendar' && (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        )}
      </svg>
      <span className="font-medium text-gray-500">{title}</span>
    </div>
    <p className="text-gray-800">{value || 'Not provided'}</p>
  </div>
);

export default Profile;