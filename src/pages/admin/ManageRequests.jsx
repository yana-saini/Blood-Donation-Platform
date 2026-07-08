import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import api from '../../api/axios';

const statusColor = {
  pending: 'text-yellow-500',
  accepted: 'text-green-500',
  rejected: 'text-red-500',
};

function ManageRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get('/requests');
        setRequests(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load requests');
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Manage Requests</h1>

        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-400 text-sm rounded p-2 mb-4 max-w-md">
            {error}
          </div>
        )}

        {loading && <p className="text-neutral-400">Loading...</p>}

        {!loading && requests.length === 0 && (
          <p className="text-neutral-500">No requests in the system yet.</p>
        )}

        <div className="space-y-3">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-neutral-900 border border-red-900 rounded-lg p-4 flex justify-between items-center flex-wrap gap-3"
            >
              <div>
                <p className="text-white font-semibold">
                  {req.bloodGroup}{' '}
                  <span className="text-neutral-400 font-normal text-sm">
                    {req.patient?.name} ({req.patient?.city}) →{' '}
                    {req.donor ? `${req.donor.name} (${req.donor.city})` : 'Unassigned'}
                  </span>
                </p>
              </div>
              <span className={`font-semibold capitalize ${statusColor[req.status]}`}>
                {req.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManageRequests;