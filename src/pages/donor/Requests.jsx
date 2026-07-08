import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import api from '../../api/axios';

const statusColor = {
  pending: 'text-yellow-500',
  accepted: 'text-green-500',
  rejected: 'text-red-500',
};

function DonorRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const fetchRequests = async () => {
    try {
      const res = await api.get('/requests/my');
      setRequests(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (id, action) => {
    setActionLoadingId(id);
    try {
      await api.put(`/requests/${id}/${action}`);
      await fetchRequests();
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${action} request`);
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Requests Received</h1>

        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-400 text-sm rounded p-2 mb-4 max-w-md">
            {error}
          </div>
        )}

        {loading && <p className="text-neutral-400">Loading...</p>}

        {!loading && requests.length === 0 && (
          <p className="text-neutral-500">No requests received yet.</p>
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
                  {req.patient && (
                    <span className="text-neutral-400 font-normal text-sm">
                      from {req.patient.name} ({req.patient.city})
                      {req.patient.phone ? ` · ${req.patient.phone}` : ''}
                    </span>
                  )}
                </p>
                {req.message && (
                  <p className="text-neutral-500 text-sm mt-1">{req.message}</p>
                )}
              </div>

              {req.status === 'pending' ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction(req.id, 'accept')}
                    disabled={actionLoadingId === req.id}
                    className="bg-green-700 hover:bg-green-600 disabled:opacity-50 transition text-white text-sm font-semibold px-4 py-1.5 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction(req.id, 'reject')}
                    disabled={actionLoadingId === req.id}
                    className="bg-neutral-700 hover:bg-neutral-600 disabled:opacity-50 transition text-white text-sm font-semibold px-4 py-1.5 rounded"
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <span className={`font-semibold capitalize ${statusColor[req.status]}`}>
                  {req.status}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DonorRequests;