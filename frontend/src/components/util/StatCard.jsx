const StatCard = ({ title, value, icon, color }) => (
  <div className={`${color} p-6 rounded-xl shadow-sm flex items-center`}>
    <div className="mr-4 p-3 bg-white rounded-full shadow-sm">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

export default StatCard