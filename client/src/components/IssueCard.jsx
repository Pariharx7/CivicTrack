// src/components/IssueCard.jsx
import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa'; // For location icon

const IssueCard = ({ issue }) => {
  // Determine color for status
  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return 'bg-yellow-500 text-black';
      case 'Reported':
        return 'bg-blue-500 text-white';
      case 'Resolved':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="bg-gray-700 rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-200 ease-in-out cursor-pointer">
      <img
        src={issue.imageUrl}
        alt={issue.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className={`px-2 py-1 text-xs rounded-full font-semibold ${getStatusColor(issue.status)}`}>
            {issue.status} {issue.statusDate}
          </span>
          <p className="text-sm text-gray-300">
            <FaMapMarkerAlt className="inline-block text-red-400 mr-1" />
            {issue.distance} km
          </p>
        </div>
        <h3 className="text-lg font-semibold text-white mb-1">{issue.title}</h3>
        <p className="text-sm text-gray-400 mb-2 truncate">
          {issue.description}
        </p>
        <p className="text-xs text-gray-400 flex items-center">
            {issue.locationName}
        </p>
      </div>
    </div>
  );
};

export default IssueCard;