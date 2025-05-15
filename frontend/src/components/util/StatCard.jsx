import { Link } from "react-router-dom";

const StatCard = ({ title, value, icon, color, route }) => (
  <div className={`${color} p-6 rounded-xl shadow-sm flex items-center`}>
    <Link to={route}><div className="mr-4 p-3 bg-white rounded-full shadow-sm">
      {icon}
    </div>
    </Link>
    <div>
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

export default StatCard