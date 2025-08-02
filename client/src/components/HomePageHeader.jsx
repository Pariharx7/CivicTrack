// src/components/HomePageHeader.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const HomePageHeader = () => {
  return (
    <header className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between shadow-md">
      <div className="text-xl font-semibold">CivicTrack</div>
      <nav className="flex items-center space-x-4">
        {/* The design shows a Login button here for Screen 1 */}
        <Link to="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out">
          Login
        </Link>
        {/* Removed search bar and Home/Profile icons as per Screen 1 layout */}
      </nav>
    </header>
  );
};

export default HomePageHeader;