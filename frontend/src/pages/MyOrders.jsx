import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getMyCars } from '../features/order/orderSlice';
import Header from '../components/Header';
import Loader from '../components/Loader';
const MyOrders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyCars())
  }, [dispatch])
  const { myOrders: orders, isLoading } = useSelector(v => v.order)
  if (isLoading) {
    return (<Loader/>)
  }
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-600">No orders found 🛒</h2>
      </div>
    );
  }
  return (
    <>
      <Header></Header>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">My Orders</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <div key={order._id} className="bg-white shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition duration-300">
              <img
                src={order.carImg}
                alt={order.carName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{order.carName}</h2>
                <p className="text-sm text-gray-500 mt-1">Ordered by: {order.buyerName}</p>
                <p className="text-sm text-gray-500">Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                <p className="text-lg font-bold text-green-600 mt-2">pkr {order.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  );
};

export default MyOrders;
