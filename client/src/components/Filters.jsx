// src/components/Filters.jsx
import React from 'react';
import { FaSearch } from 'react-icons/fa';

// Filters component will receive props for filter states and their setters
const Filters = ({
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  distanceFilter,
  setDistanceFilter,
  searchQuery,
  setSearchQuery,
  handleSearchIssues // Function to trigger search (e.g., reset pagination)
}) => {
  return (
    <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8 mt-4 mb-6">
      <div className="bg-gray-700 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          {/* Category Dropdown */}
          <div className="relative w-full sm:w-36">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="block w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none pr-8"
            >
              <option value="">Category</option>
              <option value="Roads">Roads</option>
              <option value="Lighting">Lighting</option>
              <option value="WaterSupply">Water Supply</option>
              <option value="Cleanliness">Cleanliness</option>
              <option value="PublicSafety">Public Safety</option>
              <option value="Obstructions">Obstructions</option>
              {/* Add more categories as needed */}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/></svg>
            </div>
          </div>

          {/* Status Dropdown */}
          <div className="relative w-full sm:w-36">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none pr-8"
            >
              <option value="">Status</option>
              <option value="Reported">Reported</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              {/* Add more statuses */}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/></svg>
            </div>
          </div>

          {/* Distance Dropdown */}
          <div className="relative w-full sm:w-36">
            <select
              value={distanceFilter}
              onChange={(e) => setDistanceFilter(e.target.value)}
              className="block w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none pr-8"
            >
              <option value="">Distance</option>
              <option value="1km">1 km</option>
              <option value="3km">3 km</option>
              <option value="5km">5 km</option>
              {/* Add more distances */}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/></svg>
            </div>
          </div>
        </div>

        {/* Search Issues Input and Button */}
        <div className="flex items-center w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search Issues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-800 text-white rounded-l-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 w-full"
          />
          <button
            onClick={handleSearchIssues}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-3 rounded-r-md focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center transition duration-200 ease-in-out h-10"
          >
            <FaSearch className="mr-0 sm:mr-2" />
            {/* <span className="hidden sm:inline">Search Issues</span> "Search Issues" text as per Screen 1 */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;