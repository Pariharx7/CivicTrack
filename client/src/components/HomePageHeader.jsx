// src/components/HomePageHeader.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

const HomePageHeader = () => {
  return (
    <header className="w-full bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold text-indigo-400 hover:text-indigo-300">
        CivicTrack
      </Link>
      <nav>
        {/* Login Button as seen in Screen 1 */}
        <Link
          to="/login"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 ease-in-out"
        >
          Login
        </Link>
      </nav>
    </header>
  );
};

export default HomePageHeader;