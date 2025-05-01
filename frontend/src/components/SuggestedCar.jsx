import React, { useEffect, useState } from 'react'
import { cars } from '../db/car';
import { Link, useParams } from 'react-router-dom';

const SuggestedCar = () => {
  const { id } = useParams();
  const [suggestedCars,setSuggestedCars] = useState([]);
  useEffect(()=>{
    let sortedCars = [...cars];
    const findedCar = sortedCars.find((v) => v.id === Number(id));
    if (findedCar) {
      const sug_cars = sortedCars.filter((v) => v?.price >= findedCar?.price)
      setSuggestedCars(sug_cars)
    }
  },[id])
  return (
    <div className='sm:m-10 m-4'>
      <div className='flex justify-between items-center'>
        <h1 className='font-bold my-4'>More Cars</h1>
      </div>
      <div className='flex flex-wrap overflow-x-auto gap-4 sm:gap-10 items-center'>
        {suggestedCars.map((v, i) =>
          <Link key={i} to={`/car/${v.id}`}>
            <div className='h-40 p-2 flex flex-col justify-center items-center hover:bg-amber-100 overflow-hidden w-40 mb-4'>
              <img className='h-[70%] w-[70%] object-cover rounded-sm' src={v.img_url} alt="" />
              <span>
                <h1 className='font-semibold'>{v.make} {v.model}</h1>
                <p className='text-red-500'>{v.price}</p>
              </span>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}

export default SuggestedCar