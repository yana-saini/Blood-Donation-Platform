import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout, switchRole } = useAuth();
  const navigate = useNavigate();
  const [switching, setSwitching] = useState(false);
  const [error, setError] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSwitchRole = async () => {
    setSwitching(true);
    setError('');
    try {
      const updatedUser = await switchRole();
      // Redirect to the dashboard matching the new role
      navigate(updatedUser.role === 'donor' ? '/donor/dashboard' : '/patient/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to switch role');
    } finally {
      setSwitching(false);
    }
  };

  const dashboardLink =
    user?.role === 'admin' ? '/admin/dashboard' :
    user?.role === 'donor' ? '/donor/dashboard' :
    '/patient/dashboard';

  const otherRole = user?.role === 'donor' ? 'Patient' : 'Donor';

  return (
    <nav className="bg-neutral-900 border-b border-red-900 px-6 py-4 flex items-center justify-between flex-wrap gap-2">
      <Link to={dashboardLink} className="text-white font-bold text-lg">
        <span className="text-red-600">Blood</span> Donation
      </Link>

      {user && (
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-neutral-400 text-sm">
            Welcome, {user.name} <span className="text-red-500">({user.role})</span>
          </span>

          {/* Only donors and patients can switch; admin cannot */}
          {(user.role === 'donor' || user.role === 'patient') && (
            <button
              onClick={handleSwitchRole}
              disabled={switching}
              title={`Switch to ${otherRole} mode using this same account`}
              className="bg-neutral-700 hover:bg-neutral-600 disabled:opacity-50 transition text-white text-sm font-semibold px-4 py-1.5 rounded"
            >
              {switching ? 'Switching...' : `Switch to ${otherRole}`}
            </button>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 transition text-white text-sm font-semibold px-4 py-1.5 rounded"
          >
            Logout
          </button>
        </div>
      )}

      {error && (
        <div className="w-full bg-red-900/30 border border-red-700 text-red-400 text-sm rounded p-2 mt-2">
          {error}
        </div>
      )}
    </nav>
  );
}

export default Navbar;