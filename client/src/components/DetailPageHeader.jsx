// components/DetailPageHeader.jsx
import React from 'react';
import { FaArrowLeft, FaShareAlt } from 'react-icons/fa'; // Assuming you have react-icons installed
import { useNavigate } from 'react-router-dom'; // For programmatic navigation (going back)

const DetailPageHeader = ({ onReport, onShare }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page in history
  };

  return (
    <header className="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
      <button
        onClick={handleBack}
        className="hover:text-gray-300 focus:outline-none transition duration-200 ease-in-out"
        aria-label="Go back"
      >
        <FaArrowLeft className="text-xl" />
      </button>
      <div className="flex items-center space-x-4">
        <button
          onClick={onReport}
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200 ease-in-out"
        >
          Report
        </button>
        <button
          onClick={onShare}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center transition duration-200 ease-in-out"
        >
          <FaShareAlt className="mr-2" />
          Share
        </button>
      </div>
    </header>
  );
};

export default DetailPageHeader;