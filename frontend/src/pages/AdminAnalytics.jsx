import React, { useEffect } from 'react';
import { Card, StatCard, CustomerCard, VehicleCard } from '../components/DashBoardCards';
import { FaUsers } from "react-icons/fa6";
import { IoArrowBack, IoCarSport } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa6";
import { FaChartPie } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import { getAdminAnalytics } from '../features/admin/adminSlice';
const AdminAnalytics = () => {

  const {
    totalUsers,
    totalVehicles,
    totalOrders,
    salesLast7Days,
    salesLast30Days,
    totalProfit,
    mostSellingCars = [],
    regularCustomers = [],
    lowStockVehicles = []
  } = useSelector(v => v.admin);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAdminAnalytics())
  }, [dispatch]);
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className='flex items-center gap-6 mb-8'>
          <button onClick={() => window.history.back()} className='text-3xl cursor-pointer hover:scale-110'>
            <IoArrowBack></IoArrowBack>
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            route="/all-users"
            title="Total Users"
            value={totalUsers}
            icon={<FaUsers className="text-blue-500" size={24} />}
            color="bg-blue-50"
          />
          <StatCard
            route="/all-cars"
            title="Total Vehicles"
            value={totalVehicles}
            icon={<IoCarSport className="text-green-500" size={24} />}
            color="bg-green-50"
          />
          <StatCard
            route="/order-dashboard"
            title="Total Orders"
            value={totalOrders}
            icon={<FaChartPie className="text-purple-500" size={24} />}
            color="bg-purple-50"
          />
          <StatCard
            route="/order-dashboard"
            title="Total Profit"
            value={`PKR ${totalProfit}`}
            icon={<FaRupeeSign className="text-yellow-500" size={24} />}
            color="bg-yellow-50"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Top Selling Vehicles */}
            <Card title="Top Selling Vehicles">
              {mostSellingCars.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {mostSellingCars.map((car, index) => (
                    <VehicleCard
                      key={index}
                      image={car.image}
                      make={car.make}
                      model={car.model}
                      count={car.count}
                      rank={index + 1}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No sales data available</p>
              )}
            </Card>
            <Card title="Sales Performance">
              <div className="h-64 flex items-center justify-center">
                <p className="text-gray-500">
                  {salesLast7Days.length > 0 || salesLast30Days.length > 0
                    ? "Sales charts would render here"
                    : "No sales data available"}
                </p>
              </div>
            </Card>
          </div>
          <div className="space-y-6">
            <Card title="Regular Customers">
              {regularCustomers.length > 0 ? (
                <div className="space-y-4">
                  {regularCustomers.map((customer, index) => (
                    <CustomerCard
                      key={customer._id}
                      name={customer.name}
                      email={customer.email}
                      phone={customer.phone}
                      orders={customer.orders}
                      rank={index + 1}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No regular customers found</p>
              )}
            </Card>

            {/* Low Stock Alerts */}
            <Card title="Low Stock Vehicles" alert>
              {lowStockVehicles.length > 0 ? (
                <ul className="space-y-2">
                  {lowStockVehicles.map((vehicle, index) => (
                    <li key={index} className="flex items-center p-2 hover:bg-red-50 rounded">
                      <span className="text-red-500 font-medium mr-2">
                        {vehicle.stock} left
                      </span>
                      <span>
                        {vehicle.make} {vehicle.model}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center py-4">All vehicles are well stocked</p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};


export default AdminAnalytics;