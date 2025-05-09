import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectVehicleById, fetchVehicles, getVehiclesStatus } from '../features/vehicles/vehiclesSlice';
import Header from '../components/Header';
import SuggestedCar from '../components/SuggestedCar';
import { IoArrowBack } from 'react-icons/io5';
const CarCard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const carDetail = useSelector((state) => selectVehicleById(state, id));
  const status = useSelector(getVehiclesStatus);
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchVehicles());
    }
  }, [status, dispatch]);

  if (!carDetail) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className='sm:p-10 p-5'>
        <div className='flex gap-4 mb-4'>
          <button onClick={() => window.history.back()} className='text-3xl cursor-pointer hover:scale-110'>
            <IoArrowBack></IoArrowBack>
          </button>
          <h1 className='text-3xl font-bold'>{carDetail.make} {carDetail.model}</h1>
        </div>
        <div className='flex justify-evenly sm:flex-row flex-col'>
          <img className='sm:max-h-80' src={carDetail.img_url} alt="" />
          <div className='sm:mt-0 mt-4'>
            <h1 className='text-2xl font-bold'>Features</h1>
            <span className='flex justify-center flex-col'>
              <p><strong>Top Speed:</strong> {carDetail.topSpeed}</p>
              <p><strong>Horsepower:</strong> {carDetail.hp}</p>
              <p><strong>Transmission:</strong> {carDetail.transmission}</p>
              <p><strong>Vehicle Type:</strong> {carDetail.vehicleType}</p>
              <button className='bg-amber-500 hover:bg-amber-600 transition-colors duration-300 px-6 py-3 mt-4 font-bold rounded cursor-pointer'>
                Buy : {carDetail.price} pkr
              </button>
            </span>
          </div>
        </div>
        <SuggestedCar />
      </div>
    </>
  );
};

export default CarCard;