import React from 'react'
import { Link } from 'react-router-dom';

const Cars = () => {
  

  return (
    <div className='m-10'>
      <div className='flex justify-between items-center'>
        <h1 className='font-bold my-4'>Top Cars</h1>
        <select
          className='border px-3 py-2 font-semibold rounded mb-4'
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">Sort by</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>
      <div className='flex flex-wrap overflow-x-auto gap-4 sm:gap-10 items-center'>
        {getSortedCars().map((v, i) =>
          <Link to={`/car/${v.id}`}>
            <div key={i} className='h-40 p-2 flex flex-col justify-center items-center hover:bg-amber-100 overflow-hidden w-40 mb-4'>
              <img className='h-[70%] w-[70%] object-cover rounded-sm' src={v.img_url} alt="" />
              <span>
                <h1 className='font-semibold'>{v.make} {v.model}</h1>
                <p className='text-red-500'><i>pkr</i> - {v.price}</p>
              </span>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Cars