import { FaCar, FaTachometerAlt, FaCalendarAlt, FaGasPump, FaCogs, FaShoppingCart } from 'react-icons/fa';
import { GiGearStickPattern } from 'react-icons/gi';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

export const VehicleSearchResults = () => {
  const { searchedData } = useSelector(v => v.vehicles);
  return (
    <div className="min-h-screen bg-gray-50 ">
      <Header></Header>
      {searchedData && (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Vehicle Search Results</h1>
            <p className="mt-2 text-lg text-gray-600">
              Found {searchedData?.totalResults} {searchedData?.totalResults === 1 ? 'vehicle' : 'vehicles'} matching your criteria
            </p>
          </div>

          {/* Pagination and Filters */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="text-sm text-gray-500">
              Page {searchedData?.currentPage} of {searchedData?.totalPages}
            </div>
            
          </div>

          {/* Vehicle Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {searchedData?.vehicles?.map((vehicle) => (
              <div key={vehicle._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* Vehicle Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={vehicle.img_url}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {vehicle.stock} in stock
                  </div>
                </div>

                {/* Vehicle Details */}
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{vehicle.make} {vehicle.model}</h2>
                      <p className="text-gray-600">{vehicle.year} • {vehicle.vehicleType}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2.5 py-0.5 rounded">
                      pkr {vehicle.price.toLocaleString()}
                    </span>
                  </div>

                  <p className="mt-3 text-gray-700">{vehicle.description}</p>

                  {/* Specifications */}
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <FaTachometerAlt className="mr-2 text-blue-500" />
                      <span>{vehicle.topSpeed}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FaCar className="mr-2 text-blue-500" />
                      <span>{vehicle.hp} HP</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <GiGearStickPattern className="mr-2 text-blue-500" />
                      <span>{vehicle.transmission}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FaGasPump className="mr-2 text-blue-500" />
                      <span>Petrol</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex justify-between gap-3">
                    <Link className="flex-1 bg-blue-600 cursor-pointer hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center" to={`/car/${vehicle._id}`}>
                      View Detail
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          {searchedData.totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <nav className="inline-flex rounded-md shadow">
                <button className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Previous
                </button>
                {[...Array(searchedData.totalPages)].map((_, i) => (
                  <button
                    key={i}
                    className={`px-4 py-2 border-t border-b border-gray-300 text-sm font-medium ${searchedData.currentPage === i + 1 ? 'bg-blue-50 text-blue-600 border-blue-500' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Example usage with your data