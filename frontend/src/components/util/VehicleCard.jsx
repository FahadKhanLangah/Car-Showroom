const VehicleCard = ({ image, make, model, count, rank }) => (
  <div className="flex items-center p-3 bg-white rounded-lg border border-gray-100">
    <span className="text-gray-400 font-bold mr-3">#{rank}</span>
    <img 
      src={image} 
      alt={`${make} ${model}`} 
      className="w-16 h-16 object-cover rounded-md mr-3"
    />
    <div>
      <h3 className="font-semibold">{make} {model}</h3>
      <p className="text-sm text-gray-600">{count} {count === 1 ? 'sale' : 'sales'}</p>
    </div>
  </div>
);

export default VehicleCard