// src/components/GlobalNav.jsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const GlobalNav = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To check current path for active links

  const handleReportNewIssue = () => {
    navigate('/report-issue'); // Navigate to the report issue page
  };

  return (
    <nav className="w-full bg-gray-900 text-white p-4 flex justify-between items-center shadow-lg sticky top-0 z-20 border-b-2 border-gray-700">
      {/* Left: CivicTrack Logo/Title - Links to Homepage */}
      <Link to="/" className="text-xl sm:text-2xl font-bold text-white tracking-wider hover:text-indigo-400 transition duration-200 ease-in-out">
        CivicTrack
      </Link>

      {/* Center: Navigation Links */}
      <div className="flex items-center space-x-6 sm:space-x-8">
        <Link
          to="/my-issues"
          className={`text-lg sm:text-xl font-semibold hover:text-indigo-400 transition duration-200 ease-in-out
            ${location.pathname === '/my-issues' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-300'}`
          }
        >
          My Issues
        </Link>
        {/* You could add more links here if needed, e.g., for categories, notifications */}
      </div>

      {/* Right: Report New Issue Button */}
      <button
        onClick={handleReportNewIssue}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out text-sm sm:text-base"
        aria-label="Report a new issue"
      >
        Report New Issue
      </button>
    </nav>
  );
};

export default GlobalNav;