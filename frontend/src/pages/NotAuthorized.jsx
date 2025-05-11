import { FaBan, FaShieldAlt, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotAuthorized = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-red-100 rounded-full blur-lg animate-pulse"></div>
            <div className="relative p-4 bg-red-500 rounded-full text-white">
              <FaShieldAlt className="w-12 h-12" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
          <FaBan className="text-red-500" />
          403 Access Denied
        </h1>
        
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page. Please contact your 
          administrator if you believe this is an error.
        </p>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Link 
            to="/"
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-3 rounded-lg 
                      flex items-center justify-center gap-2 transition-colors"
          >
            <FaArrowLeft />
            Return to Home
          </Link>
        </motion.div>

        <div className="mt-8 text-sm text-gray-500">
          Need help? Contact{' '}
          <a 
            href="mailto:admin@dbcentralmotors.com" 
            className="text-red-500 hover:underline"
          >
            admin@dbcentralmotors.com
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default NotAuthorized;