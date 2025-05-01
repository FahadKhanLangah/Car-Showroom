import React, { useEffect, useState } from 'react';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    // const fetchUsers = async () => {
    //   const res = await axios.get('/api/users');
    //   setUsers(res.data);
    //   setFiltered(res.data);
    // };
    // fetchUsers();
  }, []);

  useEffect(() => {
    // const f = users.filter(u =>
    //   u.name.toLowerCase().includes(search.toLowerCase()) ||
    //   u.email.toLowerCase().includes(search.toLowerCase())
    // );
    // setFiltered(f);
  }, [search, users]);

  const viewPurchases = async (userId) => {
    // const res = await axios.get(`/api/users/${userId}/purchases`);
    // setSelectedUser(userId);
    // setPurchases(res.data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or email"
        className="mb-4 w-full sm:w-1/2 px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
          <thead>
            <tr className="bg-blue-100 text-gray-700">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(user => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6 capitalize">{user.role || 'user'}</td>
                <td className="py-3 px-6">
                  <button
                    onClick={() => viewPurchases(user._id)}
                    className="text-blue-600 hover:underline"
                  >
                    View Purchases
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Purchase History</h2>
          {purchases.length === 0 ? (
            <p className="text-gray-500">No purchases found.</p>
          ) : (
            <ul className="space-y-2">
              {purchases.map((car, i) => (
                <li key={i} className="p-3 bg-gray-100 rounded-lg shadow-sm">
                  <strong>{car.make} {car.model}</strong> - ${car.price}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default UserTable;
