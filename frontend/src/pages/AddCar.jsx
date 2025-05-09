import React, { useState } from 'react';
import Header from '../components/Header';
import { useDispatch } from 'react-redux';
import { addNewVehicle } from '../features/admin/adminSlice';

const AddCar = () => {
  const [car, setCar] = useState({
    make: '',
    model: '',
    hp: '',
    topSpeed: '',
    vehicleType: '',
    img_url: '',
    category: '',
    year: '',
    price: '',
    transmission: '',
    stock: '',
    description: '',
  });
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const fieldsPerPage = 6;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar({ ...car, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewVehicle(car));
  };

  const inputFields = [
    { label: 'Make', name: 'make' },
    { label: 'Model', name: 'model' },
    { label: 'Horsepower (HP)', name: 'hp' },
    { label: 'Top Speed (km/h)', name: 'topSpeed' },
    { label: 'Vehicle Type', name: 'vehicleType' },
    { label: 'Category', name: 'category' },
    { label: 'Year', name: 'year' },
    { label: 'Price (pkr)', name: 'price' },
    { label: 'Transmission', name: 'transmission' },
    { label: 'Available Cars', name: 'stock' },
    { label: 'Car Description', name: 'description', full: true },
    { label: 'Vehicle Image URL', name: 'img_url', full: true }
  ];

  // Calculate total pages
  const totalPages = Math.ceil(inputFields.length / fieldsPerPage);

  // Get current fields to display
  const startIndex = (currentPage - 1) * fieldsPerPage;
  const endIndex = startIndex + fieldsPerPage;
  const currentFields = inputFields.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-7">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Add New Car (Page {currentPage} of {totalPages})
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {currentFields.map((v) => (
              <div key={v.name} className={v.full ? 'col-span-full' : ''}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {v.label}
                </label>
                <input
                  type="text"
                  name={v.name}
                  value={car[v.name]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  required
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            {currentPage > 1 && (
              <button
                type="button"
                onClick={prevPage}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-xl hover:bg-gray-400 transition-all"
              >
                Previous
              </button>
            )}

            {currentPage < totalPages ? (
              <button
                type="button"
                onClick={nextPage}
                className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all ml-auto"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all ml-auto"
              >
                Submit Car Details
              </button>
            )}
          </div>
        </form>
        <div className="mt-6">
          <div className='flex justify-center space-x-2 items-center'>
            {Array.from({ length: totalPages }).map((_, i) =>
              <div className={`h-4 w-4 rounded-full ${currentPage === i+1 ? 'bg-blue-600' : 'bg-gray-400'}`}>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCar;
