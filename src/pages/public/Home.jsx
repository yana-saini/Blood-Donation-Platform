import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl font-extrabold text-white mb-4">
        <span className="text-red-600">Blood</span> Donation Management System
      </h1>
      <p className="text-neutral-400 max-w-xl mb-8">
        Connect blood donors and patients on a single platform. Donors can offer blood,
        patients can request blood, and admin manages everything.
      </p>
      <div className="flex gap-4">
        <Link
          to="/register"
          className="bg-red-600 hover:bg-red-700 transition text-white font-semibold px-6 py-3 rounded"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="border border-red-600 text-red-500 hover:bg-red-600 hover:text-white transition font-semibold px-6 py-3 rounded"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Home;