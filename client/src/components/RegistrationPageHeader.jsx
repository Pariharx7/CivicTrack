// components/RegistrationPageHeader.jsx
import React from 'react';
import { FaHome } from 'react-icons/fa'; // Assuming you have react-icons installed
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const RegistrationPageHeader = ({ onDone }) => {
  return (
    <header className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
      <div className="text-xl font-semibold">CivicTrack</div>
      <nav className="flex items-center">
        <Link to="/" className="hover:text-gray-300 mr-4 transition duration-200 ease-in-out">
          <FaHome className="text-xl" />
        </Link>
      </nav>
      <button
        onClick={onDone}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out"
      >
        Done
      </button>
    </header>
  );
};

export default RegistrationPageHeader;