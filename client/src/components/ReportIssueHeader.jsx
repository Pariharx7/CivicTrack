// components/ReportIssueHeader.jsx
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa'; // Assuming you have react-icons installed
import { useNavigate } from 'react-router-dom'; // For programmatic navigation (going back)

const ReportIssueHeader = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page in history
  };

  return (
    <header className="bg-gray-900 text-white py-4 px-6 flex items-center">
      <button
        onClick={handleBack}
        className="hover:text-gray-300 mr-4 focus:outline-none transition duration-200 ease-in-out"
        aria-label="Go back"
      >
        <FaArrowLeft className="text-xl" />
      </button>
      <h1 className="text-xl font-semibold">Report an Issue</h1>
    </header>
  );
};

export default ReportIssueHeader;