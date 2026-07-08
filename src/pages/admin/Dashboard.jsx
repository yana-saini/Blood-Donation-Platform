import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import api from '../../api/axios';

function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, donors: 0, patients: 0, requests: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, requestsRes] = await Promise.all([
          api.get('/users'),
          api.get('/requests'),
        ]);

        const users = usersRes.data;
        const requests = requestsRes.data;

        setStats({
          users: users.length,
          donors: users.filter((u) => u.role === 'donor').length,
          patients: users.filter((u) => u.role === 'patient').length,
          requests: requests.length,
          pending: requests.filter((r) => r.status === 'pending').length,
        });
      } catch (err) {
        // fail silently on dashboard, tables will show real errors
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Users', value: stats.users },
    { label: 'Donors', value: stats.donors },
    { label: 'Patients', value: stats.patients },
    { label: 'Total Requests', value: stats.requests },
    { label: 'Pending Requests', value: stats.pending },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {statCards.map((s) => (
            <div key={s.label} className="bg-neutral-900 border border-red-900 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-red-500">{loading ? '-' : s.value}</p>
              <p className="text-neutral-400 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/admin/manage-users"
            className="bg-neutral-900 border border-red-900 rounded-lg p-5 hover:border-red-600 transition"
          >
            <h2 className="text-white font-semibold mb-2">Manage Donors</h2>
            <p className="text-neutral-400 text-sm">View and manage all registered users.</p>
          </Link>
          <Link
            to="/admin/manage-requests"
            className="bg-neutral-900 border border-red-900 rounded-lg p-5 hover:border-red-600 transition"
          >
            <h2 className="text-white font-semibold mb-2">Manage Requests</h2>
            <p className="text-neutral-400 text-sm">Oversee all blood requests in the system.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;