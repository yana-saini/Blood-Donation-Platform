import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

function DonorProfile() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bloodGroup: 'O+',
    city: '',
    availability: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/users/me');
        setFormData({
          name: res.data.name || '',
          phone: res.data.phone || '',
          bloodGroup: res.data.bloodGroup || 'O+',
          city: res.data.city || '',
          availability: res.data.availability,
        });
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');
    try {
      await api.put('/users/me', formData);
      setMessage('Profile updated successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <p className="text-neutral-400 p-6">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-6">My Profile</h1>

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

        <form onSubmit={handleSubmit} className="bg-neutral-900 border border-red-900 rounded-lg p-6 max-w-md space-y-4">
          <div>
            <label className="text-neutral-300 text-sm">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600"
            />
          </div>
          <div>
            <label className="text-neutral-300 text-sm">Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mt-1 bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600"
            />
          </div>
          <div>
            <label className="text-neutral-300 text-sm">Blood Group</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="w-full mt-1 bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600"
            >
              {BLOOD_GROUPS.map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-neutral-300 text-sm">City</label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full mt-1 bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="availability"
              checked={formData.availability}
              onChange={handleChange}
              className="w-4 h-4 accent-red-600"
            />
            <label className="text-neutral-300 text-sm">Available to donate</label>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 transition text-white font-semibold py-2 rounded"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DonorProfile;