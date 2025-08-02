// src/components/UserHomePageHeader.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // User profile icon

const UserHomePageHeader = () => {
  return (
    <header className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between shadow-md">
      <div className="text-xl font-semibold">CivicTrack</div>
      <nav className="flex items-center space-x-6"> {/* Increased space-x for navigation links */}
        <Link to="/my-issues" className="text-gray-300 hover:text-white transition-colors duration-200">
          My issues
        </Link>
        <Link to="/report-issue" className="text-gray-300 hover:text-white transition-colors duration-200">
          Report new issue
        </Link>
        {/* User Profile Icon - links to user profile page */}
        <Link to="/profile" className="text-gray-300 hover:text-white transition-colors duration-200">
          <FaUserCircle className="h-7 w-7" />
        </Link>
      </nav>
    </header>
  );
};

export default UserHomePageHeader;