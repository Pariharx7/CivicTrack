// src/components/UserHomePageHeader.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // For a user icon

const UserHomePageHeader = () => {
  // In a real application, you might get the username from a global state or context
  const userName = "User"; // Placeholder for logged-in user's name

  return (
    <header className="w-full bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      <Link to="/user-home" className="text-2xl font-bold text-indigo-400 hover:text-indigo-300">
        CivicTrack
      </Link>
      <nav className="flex items-center space-x-4">
        {/* "My Issues" Link */}
        <Link
          to="/my-issues"
          className="text-gray-300 hover:text-white font-medium transition duration-200 ease-in-out px-3 py-2 rounded-md"
        >
          My issues
        </Link>
        {/* "Report New Issue" Button/Link */}
        <Link
          to="/report-issue"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 ease-in-out"
        >
          Report New Issue
        </Link>
        {/* User Profile/Logout Dropdown or Link */}
        <div className="relative group">
          <button className="flex items-center text-gray-300 hover:text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-full p-2">
            <FaUserCircle className="text-xl mr-1" />
            <span className="hidden sm:inline">{userName}</span> {/* Show username for larger screens */}
            <svg className="ml-1 h-4 w-4 fill-current transition-transform duration-200 group-hover:rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/></svg>
          </button>
          {/* Dropdown Menu (hidden by default, shown on hover/focus) */}
          <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out transform scale-95 group-hover:scale-100 origin-top-right">
            <Link to="/profile" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600">Profile</Link>
            <Link to="/settings" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-600">Settings</Link>
            <button
              // onClick={handleLogout} // Implement logout logic here
              className="block w-full text-left px-4 py-2 text-sm text-red-300 hover:bg-gray-600"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default UserHomePageHeader;