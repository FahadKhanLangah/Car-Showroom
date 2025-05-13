
const Card = ({ title, children, alert = false }) => (
  <div className={`bg-white rounded-xl shadow-sm p-6 ${alert ? 'border-l-4 border-red-500' : ''}`}>
    <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
    {children}
  </div>
);

export default Card