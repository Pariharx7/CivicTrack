import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const IssueCard = ({ issue }) => {
  // ... your existing status color logic here ...

  return (
    <div className="bg-gray-700 rounded-lg shadow-md overflow-hidden p-4">
      <img
        src={issue.imageUrl && issue.imageUrl.length > 0 ? issue.imageUrl[0] : "https://via.placeholder.com/400x250?text=No+Image"}
        alt={issue.title}
        className="w-full h-40 object-cover mb-4"
      />
      <h3 className="text-lg font-semibold text-white mb-1">{issue.title}</h3>
      <p className="text-sm text-gray-400">{issue.description}</p>
      <div className="flex justify-between items-center mt-2">
        <span>Status: {issue.status}</span>
        {issue.distance !== null && (
          <p className="text-sm text-gray-300 flex items-center">
            <FaMapMarkerAlt className="inline-block mr-1 text-red-400" />
            {issue.distance} km
          </p>
        )}
      </div>
    </div>
  );
};

export default IssueCard;
