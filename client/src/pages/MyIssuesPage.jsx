// src/pages/MyIssuesPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalNav from '../components/GlobalNav'; // <--- NEW: Import GlobalNav

const MyIssuesPage = () => {
  const navigate = useNavigate();

  const handleReportNewIssue = () => {
    navigate('/report-issue'); // Adjust this path to your actual "Report New Issue" page route
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8 text-white">
      {/* NEW: Use GlobalNav */}
      <GlobalNav />

      {/* Main Content Area for Reported Issues */}
      <main className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8 md:p-10 text-white border border-gray-700 mt-8"> {/* Added mt-8 for spacing below nav */}
        <h3 className="text-xl sm:text-2xl font-bold mb-4 pb-2 border-b border-gray-700">Your Reported Issues</h3>
        <p className="text-gray-300 leading-relaxed">
          This section will display a list of all issues that you, as the logged-in user, have reported.
          Each issue would typically be rendered as an `IssueCard` component here, filtered by the logged-in user's ID.
        </p>
        <p className="text-gray-300 mt-4">
          <strong className="text-indigo-300">Filtering and Sorting:</strong> You could add options here to filter by status (e.g., "Reported," "In Progress," "Resolved") or sort by date.
        </p>

        {/* Placeholder for the list of issues */}
        <div className="mt-8 space-y-4">
          {/* Example of a placeholder issue item */}
          <div className="bg-gray-700 p-4 rounded-md border border-gray-600">
            <h4 className="text-lg font-semibold text-white">Pothole on Main Road</h4>
            <p className="text-sm text-gray-400">Status: <span className="text-yellow-400">In Progress</span></p>
            <p className="text-sm text-gray-400">Reported: June 02, 2025</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-md border border-gray-600">
            <h4 className="text-lg font-semibold text-white">Streetlight Not Working</h4>
            <p className="text-sm text-gray-400">Status: <span className="text-red-400">Reported</span></p>
            <p className="text-sm text-gray-400">Reported: July 20, 2025</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-md border border-gray-600">
            <h4 className="text-lg font-semibold text-white">Overflowing Public Dustbin</h4>
            <p className="text-sm text-gray-400">Status: <span className="text-green-400">Resolved</span></p>
            <p className="text-sm text-gray-400">Reported: July 25, 2025</p>
          </div>
        </div>

        {/* Call to action if no issues */}
        <div className="mt-8 p-6 bg-gray-700 text-center rounded-lg border border-gray-600">
          <p className="text-lg text-gray-300">Don't see your issues? Report a new one!</p>
          <button
            onClick={handleReportNewIssue}
            className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-5 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200 ease-in-out"
          >
            Report an Issue Now
          </button>
        </div>
      </main>
    </div>
  );
};

export default MyIssuesPage;