import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';

function DonorDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-2">Donor Dashboard</h1>
        <p className="text-neutral-400 mb-6">
          Blood Group: <span className="text-red-500 font-semibold">{user?.bloodGroup || 'Not set'}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/donor/profile"
            className="bg-neutral-900 border border-red-900 rounded-lg p-5 hover:border-red-600 transition"
          >
            <h2 className="text-white font-semibold mb-2">My Profile</h2>
            <p className="text-neutral-400 text-sm">Update your availability and details.</p>
          </Link>
          <Link
            to="/donor/requests"
            className="bg-neutral-900 border border-red-900 rounded-lg p-5 hover:border-red-600 transition"
          >
            <h2 className="text-white font-semibold mb-2">Requests Received</h2>
            <p className="text-neutral-400 text-sm">Accept or reject blood requests from patients.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DonorDashboard;