import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';

function PatientDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-2">Patient Dashboard</h1>
        <p className="text-neutral-400 mb-6">
          Blood Group: <span className="text-red-500 font-semibold">{user?.bloodGroup || 'Not set'}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/patient/search-donor"
            className="bg-neutral-900 border border-red-900 rounded-lg p-5 hover:border-red-600 transition"
          >
            <h2 className="text-white font-semibold mb-2">Search Donors</h2>
            <p className="text-neutral-400 text-sm">Find available donors by blood group and city.</p>
          </Link>
          <Link
            to="/patient/my-requests"
            className="bg-neutral-900 border border-red-900 rounded-lg p-5 hover:border-red-600 transition"
          >
            <h2 className="text-white font-semibold mb-2">My Requests</h2>
            <p className="text-neutral-400 text-sm">Track the status of your blood requests.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;