import { useState } from 'react';
import Navbar from '../../components/Navbar';
import api from '../../api/axios';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

function SearchDonor() {
  const [bloodGroup, setBloodGroup] = useState('');
  const [city, setCity] = useState('');
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Tracks which donor's request form is open, and the message being typed
  const [activeDonorId, setActiveDonorId] = useState(null);
  const [requestMessage, setRequestMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const params = {};
      if (bloodGroup) params.bloodGroup = bloodGroup;
      if (city) params.city = city;

      const res = await api.get('/users/donors', { params });
      setDonors(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to search donors');
    } finally {
      setLoading(false);
    }
  };

  const openRequestForm = (donorId) => {
    setActiveDonorId(donorId);
    setRequestMessage('');
    setMessage('');
  };

  const sendRequest = async (donor) => {
    try {
      await api.post('/requests', {
        donorId: donor.id,
        bloodGroup: donor.bloodGroup,
        message: requestMessage,
      });
      setMessage(`Request sent to ${donor.name}`);
      setActiveDonorId(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send request');
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Search Donors</h1>

        <form onSubmit={handleSearch} className="flex flex-wrap gap-3 mb-6">
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600"
          >
            <option value="">Any Blood Group</option>
            {BLOOD_GROUPS.map((bg) => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600"
          />

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 transition text-white font-semibold px-5 py-2 rounded"
          >
            Search
          </button>
        </form>

        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-400 text-sm rounded p-2 mb-4 max-w-md">
            {error}
          </div>
        )}
        {message && (
          <div className="bg-green-900/30 border border-green-700 text-green-400 text-sm rounded p-2 mb-4 max-w-md">
            {message}
          </div>
        )}

        {loading && <p className="text-neutral-400">Searching...</p>}

        {!loading && donors.length === 0 && (
          <p className="text-neutral-500">No donors found yet. Try searching above.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {donors.map((donor) => (
            <div
              key={donor.id}
              className="bg-neutral-900 border border-red-900 rounded-lg p-5"
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-white font-semibold">{donor.name}</h2>
                <span className="text-red-500 font-bold">{donor.bloodGroup}</span>
              </div>
              <p className="text-neutral-400 text-sm mb-1">📍 {donor.city || 'City not set'}</p>
              <p className="text-neutral-400 text-sm mb-4">
                {donor.availability ? (
                  <span className="text-green-500">Available</span>
                ) : (
                  <span className="text-neutral-600">Unavailable</span>
                )}
              </p>

              {activeDonorId === donor.id ? (
                <div className="space-y-2">
                  <textarea
                    placeholder="Optional message to donor..."
                    value={requestMessage}
                    onChange={(e) => setRequestMessage(e.target.value)}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-red-600"
                    rows={2}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => sendRequest(donor)}
                      className="flex-1 bg-red-600 hover:bg-red-700 transition text-white text-sm font-semibold py-1.5 rounded"
                    >
                      Send Request
                    </button>
                    <button
                      onClick={() => setActiveDonorId(null)}
                      className="flex-1 bg-neutral-700 hover:bg-neutral-600 transition text-white text-sm font-semibold py-1.5 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => openRequestForm(donor.id)}
                  disabled={!donor.availability}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 disabled:cursor-not-allowed transition text-white text-sm font-semibold py-1.5 rounded"
                >
                  Request
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchDonor;