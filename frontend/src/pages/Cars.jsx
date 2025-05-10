import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVehicles, getTotalStock, getVehiclesError, getVehiclesStatus, selectAllVehicles, sortVehicles } from '../features/vehicles/vehiclesSlice';
const Cars = () => {
  const dispatch = useDispatch();
  const vehicles = useSelector(selectAllVehicles);
  const status = useSelector(getVehiclesStatus);
  const error = useSelector(getVehiclesError);
  const totalStock = useSelector(getTotalStock);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchVehicles());
    }
  }, [status, dispatch]);

  const handleSortChange = (e) => {
    dispatch(sortVehicles(e.target.value));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='m-10'>
      <div className='flex justify-between items-center'>
        <h1 className='font-bold my-4'>Top Cars (Total in stock: {totalStock})</h1>
        <select
          className='border px-3 py-2 font-semibold rounded mb-4'
          onChange={handleSortChange}
        >
          <option value="default">Sort by</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>
      <div className='flex flex-wrap overflow-x-auto gap-3 sm:gap-10 items-center'>
        {vehicles.map((vehicle) => (
          <Link key={vehicle._id} to={`/car/${vehicle._id}`}>
            <div className='h-40 p-3 flex flex-col justify-center items-center hover:bg-amber-100 overflow-hidden w-36 sm:w-40 mb-4'>
              <img 
                className='h-[70%] max-w-full object-cover rounded-sm' 
                src={vehicle.img_url} 
                alt={`${vehicle.make} ${vehicle.model}`} 
              />
              <span>
                <h1 className='font-semibold'>{vehicle.make} {vehicle.model}</h1>
                <p className='text-sm text-gray-600 mb-2'>PKR - {vehicle.price.toLocaleString()}</p>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cars;