// src/pages/DetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate
import DetailPageHeader from '../components/DetailPageHeader'; // Assuming this path is correct
import { FaMapMarkerAlt, FaShareAlt, FaSearch } from 'react-icons/fa'; // Added FaSearch icon

const DetailPage = () => {
  const { id } = useParams(); // Get the issue ID from the URL (e.g., /detail/123)
  const navigate = useNavigate(); // For navigating to search results

  // State to hold the issue's data
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for the new filter/search elements
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [distanceFilter, setDistanceFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // State for the search issues input

  useEffect(() => {
    // In a real application, you would fetch issue data from your backend API here
    // based on the 'id' from useParams.

    // Simulate API call with dummy data
    const fetchIssueDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulate a network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Dummy data for demonstration. Replace with actual API fetch.
        const dummyIssueData = {
          id: id,
          imageUrl: 'https://images.unsplash.com/photo-1560782202-154b39d57ef2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG90aG9sZXN8ZW58MHx8MHx8fDA%3D', // Replace with actual image URL
          title: 'Pothole on main road',
          status: 'In Progress',
          reportedBy: 'Anonymous',
          dateTime: 'Jun 02, 2025 - 10:34 AM',
          locationName: 'C.G road, Ahmedabad, Gujarat',
          mapImageUrl: 'https://via.placeholder.com/200x150?text=Map+of+Location', // Placeholder for map
          description: `The main road in C.G road, Ahmedabad, is riddled with potholes, making it dangerous and difficult to travel on. We kindly request the municipal authorities to address this issue promptly to ensure the safety of commuters.`,
          activity: [
            { id: 1, text: 'Jun 02, 10:34 AM - Reported by user' },
            { id: 2, text: 'July 26, 09:00 AM - Assigned to municipal worker' },
            { id: 3, text: 'July 28, 04:15 PM - Marked "In Progress"' },
            // Add more activities as needed
          ],
        };
        setIssue(dummyIssueData);
      } catch (err) {
        setError('Failed to load issue details.');
        console.error("Error fetching issue:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIssueDetails();
  }, [id]); // Re-run effect if ID changes

  const handleEdit = () => {
    alert(`Edit issue ${id}`);
    // Implement navigation to an edit page or open a modal
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete issue ${id}?`)) {
      alert(`Deleting issue ${id}`);
      // Implement actual deletion logic, e.g., API call, then redirect to home
      navigate('/'); // Example: navigate back to home after deletion
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: issue?.title || 'CivicTrack Issue',
        text: issue?.description || 'Check out this issue on CivicTrack!',
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      alert(`Share functionality not supported on this browser. Share link: ${window.location.href}`);
      // Fallback for browsers that don't support Web Share API
    }
  };

  const handleReportSpam = () => {
    alert(`Reporting issue ${id} as spam.`);
    // Implement API call to report spam
  };

  const handleSearchIssues = () => {
    // This function would typically navigate to a search results page
    // and pass the current filter values and search query as state or query params.
    console.log("Searching issues with:", {
      category: categoryFilter,
      status: statusFilter,
      distance: distanceFilter,
      query: searchQuery
    });
    // Example navigation to a search results page
    navigate(`/search?category=${categoryFilter}&status=${statusFilter}&distance=${distanceFilter}&query=${searchQuery}`);
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white text-lg">
        Loading issue details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-red-500 text-lg">
        <DetailPageHeader onEdit={handleEdit} onDelete={handleDelete} onShare={handleShare} />
        <p className="mt-4">{error}</p>
      </div>
    );
  }

  if (!issue) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white text-lg">
        <DetailPageHeader onEdit={handleEdit} onDelete={handleDelete} onShare={handleShare} />
        <p className="mt-4">Issue not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center">
      {/* Reusing the DetailPageHeader component */}
      <DetailPageHeader onEdit={handleEdit} onDelete={handleDelete} onShare={handleShare} />

      {/* New Filter/Search Bar Section */}
      <div className="w-full max-w-2xl px-4 sm:px-6 lg:px-8 mt-4 mb-6">
        <div className="bg-gray-700 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            {/* Category Dropdown */}
            <div className="relative w-full sm:w-32">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="block w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none pr-8"
              >
                <option value="">Category</option>
                <option value="Roads">Roads</option>
                <option value="Waste">Waste</option>
                {/* Add more categories as needed */}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/></svg>
              </div>
            </div>

            {/* Status Dropdown */}
            <div className="relative w-full sm:w-32">
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
            <div className="relative w-full sm:w-32">
              <select
                value={distanceFilter}
                onChange={(e) => setDistanceFilter(e.target.value)}
                className="block w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none pr-8"
              >
                <option value="">Distance</option>
                <option value="1km">1 km</option>
                <option value="5km">5 km</option>
                <option value="10km">10 km</option>
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
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-r-md focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center transition duration-200 ease-in-out"
            >
              <FaSearch className="mr-0 sm:mr-2" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow w-full max-w-2xl p-4 sm:p-6 lg:p-8 bg-gray-800 rounded-lg shadow-lg my-8 mx-auto text-white">
        {/* Main Image and Title */}
        <div className="relative mb-4 rounded-lg overflow-hidden">
          <img
            src={issue.imageUrl}
            alt={issue.title}
            className="w-full h-auto max-h-96 object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
            <h1 className="text-2xl sm:text-3xl font-bold">{issue.title}</h1>
          </div>
        </div>

        {/* Status and Reported By */}
        <div className="flex justify-between items-center mb-4 text-sm sm:text-base">
          <span className={`px-3 py-1 rounded-full font-semibold ${issue.status === 'In Progress' ? 'bg-yellow-500 text-black' : 'bg-gray-600'}`}>
            Status: {issue.status}
          </span>
          <span className="text-gray-300">Reported by: {issue.reportedBy}</span>
        </div>

        {/* Date, Time, Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-700 p-4 rounded-md">
            <p className="text-sm font-medium text-gray-300">Date & Time</p>
            <p className="text-lg font-semibold">{issue.dateTime}</p>
            {issue.reportedBy === 'Anonymous' && (
                <button
                    onClick={handleReportSpam}
                    className="mt-2 text-red-400 hover:text-red-500 text-sm focus:outline-none"
                >
                    Report Spam
                </button>
            )}
          </div>
          <div className="bg-gray-700 p-4 rounded-md">
            <p className="text-sm font-medium text-gray-300">Location</p>
            <p className="text-lg font-semibold flex items-center">
              <FaMapMarkerAlt className="text-red-400 mr-2" />
              {issue.locationName}
            </p>
            <div className="mt-2 w-full h-32 bg-gray-600 rounded-md overflow-hidden">
              <img
                src={issue.mapImageUrl}
                alt="Location Map"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6 bg-gray-700 p-4 rounded-md">
          <h2 className="text-lg font-semibold text-gray-300 mb-2">Description</h2>
          <p className="text-gray-200 leading-relaxed">{issue.description}</p>
        </div>

        {/* Activity Log */}
        <div className="bg-gray-700 p-4 rounded-md">
          <h2 className="text-lg font-semibold text-gray-300 mb-2">Activity</h2>
          <ul className="space-y-2">
            {issue.activity.map((activityItem) => (
              <li key={activityItem.id} className="text-gray-200 text-sm">
                {activityItem.text}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default DetailPage;