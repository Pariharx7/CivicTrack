// components/HomePageHeader.jsx
import React, { useState } from 'react';
import { FaSearch, FaHome, FaUserCircle } from 'react-icons/fa'; // Assuming you have react-icons installed
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const HomePageHeader = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
    // You might also want to navigate to a search results page here, e.g., navigate('/search-results', { state: { searchTerm } });
  };

  return (
    <header className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
      <div className="text-xl font-semibold">CivicTrack</div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-800 text-white rounded-md py-2 px-3 mr-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center transition duration-200 ease-in-out"
        >
          <FaSearch className="mr-2" />
          Search
        </button>
      </div>
      <nav className="flex items-center space-x-4">
        <Link to="/" className="hover:text-gray-300 transition duration-200 ease-in-out">
          <FaHome className="text-xl" />
        </Link>
        <Link to="/profile" className="hover:text-gray-300 transition duration-200 ease-in-out">
          <FaUserCircle className="text-xl" />
        </Link>
      </nav>
    </header>
  );
};

export default HomePageHeader;