import { FaTrash, FaEdit, FaArrowUp, FaArrowDown, FaCar } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoArrowBack } from 'react-icons/io5';
import { deleteCar, fetchVehicles, updateCar } from '../../features/vehicles/vehiclesSlice';

const CarInventoryTable = () => {
  const { vehicles: cars } = useSelector(state => state.vehicles);

  const [sortConfig, setSortConfig] = useState({ key: 'sold', direction: 'desc' });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ price: 0, stock: 0 });
  const sortedCars = [...cars].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleEditClick = (car) => {
    setEditingId(car._id);
    setEditForm({ price: car.price, stock: car.stock });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    }));
  };
  const dispatch = useDispatch();

  const onDeleteCar = (id) => {
    dispatch(deleteCar(id));
    dispatch(fetchVehicles());
  }
  const handleSave = (id) => {
    const formdata = {
      stock: editForm.stock,
      price: editForm.price,
      id
    }
    dispatch(updateCar(formdata));
    setEditingId(null);
    dispatch(fetchVehicles());
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <FaArrowUp className="ml-1" /> : <FaArrowDown className="ml-1" />;
  };
  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch])
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className='flex items-center gap-6 mb-8'>
            <button onClick={() => window.history.back()} className='text-3xl cursor-pointer hover:scale-110'>
              <IoArrowBack></IoArrowBack>
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Car Inventory Management</h1>
          </div>
          <p className="mt-2 text-gray-600">
            Manage your vehicle stock, pricing, and track sales performance
          </p>
        </div>

        {/* Inventory Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Car Details
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('price')}
                  >
                    <div className="flex items-center">
                      Price
                      {getSortIcon('price')}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('stock')}
                  >
                    <div className="flex items-center">
                      In Stock
                      {getSortIcon('stock')}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort('sold')}
                  >
                    <div className="flex items-center">
                      Total Sold
                      {getSortIcon('sold')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedCars.map((car) => (
                  <tr key={car._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16">
                          {car.img_url ? (
                            <img
                              className="h-16 w-16 rounded-md object-cover border border-gray-200"
                              src={car.img_url}
                              alt={`${car.make} ${car.model}`}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '';
                                e.target.className = 'h-16 w-16 text-gray-300 flex items-center justify-center';
                                e.target.innerHTML = '<FaCar className="h-8 w-8" />';
                              }}
                            />
                          ) : (
                            <div className="h-16 w-16 rounded-md border border-gray-200 flex items-center justify-center text-gray-300">
                              <FaCar className="h-8 w-8" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">{car.make} {car.model}</div>
                          <div className="text-sm text-gray-500">{car.year} • {car.vehicleType}</div>
                          <div className="text-xs text-gray-400 mt-1">{car.hp} HP • {car.topSpeed}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === car._id ? (
                        <input
                          type="number"
                          name="price"
                          value={editForm.price}
                          onChange={handleEditChange}
                          className="w-24 px-2 py-1 border border-gray-300 rounded-md text-sm"
                        />
                      ) : (
                        <div className="text-sm font-medium text-gray-900">
                          {car.price?.toLocaleString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingId === car._id ? (
                        <input
                          type="number"
                          name="stock"
                          value={editForm.stock}
                          onChange={handleEditChange}
                          className="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm"
                        />
                      ) : (
                        <div className="text-sm text-gray-900">
                          {car.stock} units
                          {car.stock < 5 && (
                            <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                              Low Stock
                            </span>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">{car.sold}</div>
                        {car.sold > 10 && (
                          <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            Best Seller
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        {editingId === car._id ? (
                          <>
                            <button
                              className="text-green-600 hover:text-green-900 px-3 py-1 rounded-md border border-green-600 hover:bg-green-50"
                              onClick={() => handleSave(car._id)}
                            >
                              Save
                            </button>
                            <button
                              className="text-gray-600 hover:text-gray-900 px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50"
                              onClick={() => setEditingId(null)}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                              onClick={() => handleEditClick(car)}
                            >
                              <FaEdit className="h-5 w-5" />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                              onClick={() => onDeleteCar(car._id)}
                            >
                              <FaTrash className="h-5 w-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">Total Cars in Stock</h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {cars.reduce((sum, car) => sum + (car.stock || 0), 0)}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">Total Cars Sold</h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {cars.reduce((sum, car) => sum + (car.sold || 0), 0)}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">Top Selling Car</h3>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {cars.length > 0
                ? `${[...cars].sort((a, b) => (b.sold || 0) - (a.sold || 0))[0].make} ${[...cars].sort((a, b) => (b.sold || 0) - (a.sold || 0))[0].model}`
                : 'No data'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarInventoryTable;