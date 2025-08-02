// components/LoginPageHeader.jsx
import React from 'react';
import { FaHome } from 'react-icons/fa'; // Assuming you have react-icons installed
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const LoginPageHeader = () => {
  return (
    <header className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
      <div className="text-xl font-semibold">CivicTrack</div>
      <nav className="flex items-center">
        <Link to="/" className="hover:text-gray-300 transition duration-200 ease-in-out">
          <FaHome className="text-xl" />
        </Link>
      </nav>
      {/* An empty div to help balance the space if needed, or remove if not necessary for your layout */}
      <div className="w-0"></div>
    </header>
  );
};

export default LoginPageHeader;