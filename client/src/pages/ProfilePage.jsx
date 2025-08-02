// src/pages/ProfilePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
// Depending on design, you might use GlobalNav or DetailPageHeader here
import GlobalNav from '../components/GlobalNav'; // Assuming GlobalNav is appropriate for general user pages

const ProfilePage = () => {
  const navigate = useNavigate();

  // Dummy user data for display
  const user = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    memberSince: 'January 2024',
    reportedIssuesCount: 15,
    resolvedIssuesCount: 10,
    avatarUrl: 'https://via.placeholder.com/150/808080/FFFFFF?text=JD', // Placeholder avatar
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center pb-8 text-white">
      <GlobalNav /> {/* Use GlobalNav for consistent navigation */}

      <main className="w-full max-w-xl mt-8 bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8 md:p-10 border border-gray-700 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 pb-2 border-b border-gray-700">
          User Profile
        </h2>

        <div className="flex flex-col items-center space-y-4">
          <img
            src={user.avatarUrl}
            alt="User Avatar"
            className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
          />
          <h3 className="text-xl font-semibold text-white">{user.name}</h3>
          <p className="text-gray-300">{user.email}</p>
        </div>

        <div className="mt-8 text-left space-y-3">
          <div className="flex justify-between items-center text-gray-300">
            <span className="font-medium">Member Since:</span>
            <span>{user.memberSince}</span>
          </div>
          <div className="flex justify-between items-center text-gray-300">
            <span className="font-medium">Issues Reported:</span>
            <span className="text-indigo-400">{user.reportedIssuesCount}</span>
          </div>
          <div className="flex justify-between items-center text-gray-300">
            <span className="font-medium">Issues Resolved:</span>
            <span className="text-green-400">{user.resolvedIssuesCount}</span>
          </div>
        </div>

        {/* Example: Edit Profile Button */}
        <button
          onClick={() => alert('Edit Profile functionality would go here!')}
          className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
        >
          Edit Profile
        </button>

        {/* Example: Back to My Issues Button */}
        <button
          onClick={() => navigate('/my-issues')}
          className="mt-4 w-full bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 ease-in-out"
        >
          Back to My Issues
        </button>
      </main>
    </div>
  );
};

export default ProfilePage;