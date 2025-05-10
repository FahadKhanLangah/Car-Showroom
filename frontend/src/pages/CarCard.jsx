import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectVehicleById, fetchVehicles, getVehiclesStatus } from '../features/vehicles/vehiclesSlice';
import { buyVehicle } from '../features/order/orderSlice';
import Header from '../components/Header';
import SuggestedCar from '../components/SuggestedCar';
import { IoArrowBack, IoCheckmarkCircle, IoClose, IoAlertCircle } from 'react-icons/io5';
import { toast } from 'react-toastify';

const CarCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const carDetail = useSelector((state) => selectVehicleById(state, id));
  const status = useSelector(getVehiclesStatus);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchVehicles());
    }
  }, [status, dispatch]);

  const handleBuyNow = () => {
    setIsPurchasing(true);
    dispatch(buyVehicle(id)).then(({ meta }) => {
      console.log(meta);
      if (meta.requestStatus === 'fulfilled') {
        toast.success(`Successfully purchased ${carDetail.make} ${carDetail.model}!`);
        setShowConfirmation(false);
        setIsPurchasing(false);
      }
    });
  };
  if (!carDetail) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto sm:p-10 p-5">
        {/* Back Button and Title */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Go back"
          >
            <IoArrowBack className="text-2xl text-gray-700" />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">
            {carDetail.make} {carDetail.model} <span className="text-gray-500">({carDetail.year})</span>
          </h1>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Car Image */}
          <div className="lg:w-1/2">
            <div className="bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={carDetail.img_url}
                alt={`${carDetail.make} ${carDetail.model}`}
                className="w-full h-auto max-h-96 object-contain"
              />
            </div>
          </div>

          {/* Car Details */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Vehicle Specifications</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Top Speed</p>
                  <p className="font-semibold">{carDetail.topSpeed}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Horsepower</p>
                  <p className="font-semibold">{carDetail.hp} HP</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Transmission</p>
                  <p className="font-semibold">{carDetail.transmission}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Vehicle Type</p>
                  <p className="font-semibold">{carDetail.vehicleType}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-semibold">{carDetail.category}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Stock Available</p>
                  <p className={`font-semibold ${carDetail.stock < 5 ? 'text-red-600' : 'text-green-600'}`}>
                    {carDetail.stock} units
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600">{carDetail.description}</p>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Total Price</p>
                  <p className="text-2xl font-bold text-amber-600">
                    PKR {carDetail.price.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setShowConfirmation(true)}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <SuggestedCar />

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-semibold text-gray-800">
                  Confirm Purchase
                </h3>
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="text-gray-400 hover:text-gray-600"
                  disabled={isPurchasing}
                >
                  <IoClose size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {!isPurchasing ? (
                  <>
                    <div className="flex items-start mb-5">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                        <IoAlertCircle className="h-6 w-6 text-amber-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-800">
                          Purchase {carDetail.make} {carDetail.model}?
                        </h3>
                        <div className="mt-2 text-sm text-gray-600">
                          <p>You're about to purchase this vehicle for:</p>
                          <p className="font-bold text-lg mt-1">PKR {carDetail.price.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-5">
                      <h4 className="font-medium text-gray-700 mb-2">Vehicle Summary</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex justify-between">
                          <span>Make/Model:</span>
                          <span className="font-medium">{carDetail.make} {carDetail.model}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Year:</span>
                          <span className="font-medium">{carDetail.year}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Category:</span>
                          <span className="font-medium">{carDetail.category}</span>
                        </li>
                      </ul>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                      <IoCheckmarkCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      Processing Your Purchase...
                    </h3>
                    <p className="text-sm text-gray-600">
                      Please wait while we confirm your order.
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 px-4 py-3 flex justify-end space-x-3">
                {!isPurchasing && (
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                )}
                <button
                  onClick={handleBuyNow}
                  disabled={isPurchasing}
                  className={`px-4 py-2 rounded-md text-sm font-medium text-white ${isPurchasing ? 'bg-amber-400' : 'bg-amber-600 hover:bg-amber-700'} flex items-center`}
                >
                  {isPurchasing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Confirm Purchase'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CarCard;