import React, { useState } from 'react'
import Header from '../components/Header';

const AddCar = () => {
  const [car, setCar] = useState({
    make: '',
    model: '',
    hp: '',
    topSpeed: '',
    vehicleType: '',
    vehicleImgUrl: '',
    category: '',
    year: '',
    price: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar({ ...car, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(car);
    
  };
const InputFields = [
  { label: 'Make', name: 'make' },
  { label: 'Model', name: 'model' },
  { label: 'Horsepower (HP)', name: 'hp' },
  { label: 'Top Speed (km/h)', name: 'topSpeed' },
  { label: 'Vehicle Type', name: 'vehicleType' },
  { label: 'Category', name: 'category' },
  { label: 'Year', name: 'year' },
  { label: 'Price (pkr)', name: 'price' },
  { label: 'Image URL', name: 'vehicleImgUrl', full: true },
]
  return (
    <>
      <Header></Header>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-7">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Car</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {InputFields.map((v) => (
            <div key={v.name} className={v.full ? 'col-span-full' : ''}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{v.label}</label>
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
          <div className="col-span-full">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold">
              Submit Car Details
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddCar