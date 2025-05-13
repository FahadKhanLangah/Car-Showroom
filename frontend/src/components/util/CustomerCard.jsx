const CustomerCard = ({ name, email, phone, orders, rank }) => (
  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
    <span className="text-gray-400 font-bold mr-3">#{rank}</span>
    <div className="flex-1">
      <h3 className="font-semibold">{name}</h3>
      <p className="text-sm text-gray-600">{email}</p>
      <p className="text-sm text-gray-600">{phone}</p>
    </div>
    <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
      {orders} {orders === 1 ? 'order' : 'orders'}
    </div>
  </div>
);

export default CustomerCard