import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllVehicles } from '../features/vehicles/vehiclesSlice';
import { Link } from 'react-router-dom';

const SuggestedCar = () => {
  const vehicles = useSelector(selectAllVehicles);
  const suggestedVehicles = vehicles.slice(0, 3);
  return (
    <div className='mt-10'>
      <h2 className='text-2xl font-bold mb-4'>Suggested Vehicles</h2>
      <div className='flex flex-wrap gap-4'>
        {suggestedVehicles.map((vehicle) => (
          <Link key={vehicle._id} to={`/car/${vehicle._id}`} className='border p-4 rounded-lg hover:shadow-lg transition-shadow'>
            <img 
              src={vehicle.img_url} 
              alt={`${vehicle.make} ${vehicle.model}`} 
              className='w-40 h-24 object-cover'
            />
            <h3 className='font-semibold mt-2'>{vehicle.make} {vehicle.model}</h3>
            <p className='text-sm text-gray-600'>PKR {vehicle.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedCar;