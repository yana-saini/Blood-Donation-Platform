import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import api from '../../api/axios';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user permanently?')) return;
    setDeletingId(id);
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete user');
    } finally {
      setDeletingId(null);
    }
  };

  const roleColor = {
    admin: 'text-purple-400',
    donor: 'text-red-500',
    patient: 'text-blue-400',
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Manage Users</h1>

        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-400 text-sm rounded p-2 mb-4 max-w-md">
            {error}
          </div>
        )}

        {loading && <p className="text-neutral-400">Loading...</p>}

        {!loading && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-red-900 text-neutral-400 text-sm">
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Email</th>
                  <th className="py-2 pr-4">Role</th>
                  <th className="py-2 pr-4">Blood Group</th>
                  <th className="py-2 pr-4">City</th>
                  <th className="py-2 pr-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-neutral-800 text-sm">
                    <td className="py-2 pr-4 text-white">{u.name}</td>
                    <td className="py-2 pr-4 text-neutral-400">{u.email}</td>
                    <td className={`py-2 pr-4 font-semibold capitalize ${roleColor[u.role]}`}>
                      {u.role}
                    </td>
                    <td className="py-2 pr-4 text-neutral-400">{u.bloodGroup || '-'}</td>
                    <td className="py-2 pr-4 text-neutral-400">{u.city || '-'}</td>
                    <td className="py-2 pr-4">
                      <button
                        onClick={() => handleDelete(u.id)}
                        disabled={deletingId === u.id}
                        className="bg-red-700 hover:bg-red-600 disabled:opacity-50 transition text-white text-xs font-semibold px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageUsers;