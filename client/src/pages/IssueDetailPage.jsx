// src/pages/IssueDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DetailPageHeader from '../components/DetailPageHeader';
import Filters from '../components/Filters'; // Import the Filters component
import { FaMapMarkerAlt, FaCalendarAlt, FaShareAlt } from 'react-icons/fa';
import { MdOutlineMailOutline } from "react-icons/md";

const IssueDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for the filter/search elements
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [distanceFilter, setDistanceFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Dummy data (replace with actual API fetch)
  const dummyIssues = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1560782202-154b39d57ef2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG90aG9sZXN8ZW58MHx8MHx8fDA%3D',
      title: 'Pothole on Main Road', // Updated title for consistency
      status: 'In Progress',
      statusDate: 'Jun 02, 2025 - 10:34 AM',
      description: `The main road in C.G road, Ahmedabad, is riddled with potholes, making it dangerous and difficult to travel on. We kindly request the municipal authorities to address this issue promptly to ensure the safety of commuters. The pothole is roughly 2 meters wide and 15 cm deep, located directly after the main traffic light when heading towards the city center. This particular section of the road has seen an increase in traffic accidents due to the severe condition.`,
      category: 'Roads & Potholes',
      locationName: 'C.G Road, Ahmedabad, Gujarat',
      distance: '1.1 km',
      reportedBy: 'Jane Doe',
      contactEmail: 'jane.doe@example.com',
      activity: [
          { id: 1, text: 'Jun 02, 2025, 10:34 AM - Issue Reported by User' },
          { id: 2, text: 'Jun 03, 2025, 09:00 AM - Assigned to Road Maintenance Department' },
          { id: 3, text: 'Jun 05, 2025, 02:15 PM - Site Inspection Completed' },
          { id: 4, text: 'Jun 08, 2025, 11:30 AM - Marked "In Progress", repair scheduled for next week.' },
          { id: 5, text: 'Jun 15, 2025, 03:00 PM - Initial patch work started.' },
      ],
    },
    {
      id: '2',
      imageUrl: 'https://via.placeholder.com/800x450?text=Streetlight+Issue+Night',
      title: 'Streetlight Not Working in Sector 10',
      status: 'Reported',
      statusDate: 'July 20, 2025 - 07:00 PM',
      description: 'Streetlight pole #456 on Elm Street has been out for over a week, making the area very dark and unsafe at night. This is a residential area and affects pedestrian safety.',
      category: 'Lighting',
      locationName: 'Elm Street, Sector 10, Vijaypur',
      distance: '0.5 km',
      reportedBy: 'Anonymous',
      contactEmail: null,
      activity: [
        { id: 1, text: 'July 20, 2025, 07:00 PM - Issue Reported by User' },
      ],
    },
    {
        id: '3',
        imageUrl: 'https://via.placeholder.com/800x450?text=Overflowing+Dustbin',
        title: 'Overflowing Public Dustbin near Market',
        status: 'Resolved',
        statusDate: 'August 01, 2025 - 09:30 AM',
        description: 'The public dustbin located at the corner of Main Market Road and Temple Lane is consistently overflowing, spilling waste onto the pavement. This is creating an unhygienic environment and attracting stray animals. Requesting prompt collection and potentially a larger bin.',
        category: 'Cleanliness & Waste Management',
        locationName: 'Main Market Road, Vijaypur',
        distance: '0.2 km',
        reportedBy: 'CivicSense',
        contactEmail: 'civicsense@example.com',
        activity: [
            { id: 1, text: 'July 25, 2025, 02:00 PM - Issue Reported by User' },
            { id: 2, text: 'July 28, 2025, 10:00 AM - Garbage Collection Scheduled' },
            { id: 3, text: 'August 01, 2025, 09:30 AM - Marked "Resolved" by City Official' },
        ],
    },
  ];

  useEffect(() => {
    setLoading(true);
    setError(null);
    const foundIssue = dummyIssues.find(i => i.id === id);
    if (foundIssue) {
      setIssue(foundIssue);
      setLoading(false);
    } else {
      setError('Issue not found.');
      setLoading(false);
    }
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: issue?.title || 'CivicTrack Issue',
        text: issue?.description || 'Check out this issue on CivicTrack!',
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      alert(`Share functionality not supported on this browser. Share link: ${window.location.href}`);
    }
  };

  const handleMoreOptions = () => {
    // This is where you would typically open a dropdown or modal
    // with options like "Mark as Resolved", "Edit Issue", "Delete Issue", "Report Spam" etc.
    // For now, we'll just alert.
    const currentUserCanResolve = issue.reportedBy === 'Jane Doe' && issue.status !== 'Resolved'; // Example logic
    let options = [`Share Issue`, `Report Spam`];
    if (currentUserCanResolve) {
      options.push(`Mark as Resolved`);
    }
    // You could dynamically build the menu content here
    alert(`More Options for "${issue.title}":\n${options.join('\n')}`);
    // Example: if "Mark as Resolved" was clicked in such a menu:
    // if (option === "Mark as Resolved") handleMarkResolved();
  };

  const handleSearchIssues = () => {
    console.log("Searching issues with:", {
      category: categoryFilter,
      status: statusFilter,
      distance: distanceFilter,
      query: searchQuery
    });
    navigate(`/search?category=${categoryFilter}&status=${statusFilter}&distance=${distanceFilter}&query=${searchQuery}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white text-lg">
        <p>Loading issue details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-red-400 text-lg">
        <DetailPageHeader title="Error" onShare={()=>{}} onMoreOptions={()=>{}} /> {/* Provide dummy handlers for error state */}
        <p className="mt-4">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!issue) {
      return (
          <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white text-lg">
              <p>No issue data available.</p>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center">
      {/* DetailPageHeader with issue title and specific actions */}
      <DetailPageHeader
        title={issue.title}
        onShare={handleShare}
        onMoreOptions={handleMoreOptions}
      />

      {/* The Filters Component, as seen in Screen 6 */}
      <Filters
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        distanceFilter={distanceFilter}
        setDistanceFilter={setDistanceFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onApplyFilters={handleSearchIssues}
      />

      <main className="flex-grow w-full max-w-4xl bg-gray-800 rounded-xl shadow-2xl my-8 mx-auto text-white overflow-hidden border border-gray-700">
        {/* Issue Image with Status Badge */}
        <div className="w-full h-72 sm:h-96 md:h-[500px] overflow-hidden bg-gray-700 flex items-center justify-center relative">
          <img
            src={issue.imageUrl}
            alt={issue.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {/* Status Badge - Prominent on Image as per Screen 6 */}
          <span
            className={`absolute bottom-4 right-4 text-white text-sm sm:text-base font-bold px-4 py-2 rounded-full shadow-lg z-10
              ${issue.status === 'Resolved' ? 'bg-green-600' :
                 issue.status === 'In Progress' ? 'bg-yellow-600' :
                 'bg-red-600'
              }`
            }
          >
            {issue.status}
          </span>
        </div>

        {/* Issue Details Content */}
        <div className="p-6 sm:p-8 md:p-10 space-y-7">

          {/* Title - (This title is also in the header, but prominent here as in Screen 6) */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight hidden"> {/* Hidden as it's now in the header, keep for content clarity if needed */}
            {issue.title}
          </h1>

          {/* Status and Reported By as separate section */}
          <div className="flex justify-between items-center mb-4 text-sm sm:text-base">
            <span className={`px-3 py-1 rounded-full font-semibold ${issue.status === 'In Progress' ? 'bg-yellow-500 text-black' : 'bg-gray-600'}`}>
              Status: {issue.status}
            </span>
            <span className="text-gray-300">Reported by: {issue.reportedBy}</span>
          </div>

          {/* Date, Time, Location - as structured cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-700 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-300">Date & Time</p>
              <p className="text-lg font-semibold">{issue.statusDate}</p>
              {issue.reportedBy === 'Anonymous' && (
                <button
                  onClick={() => alert(`Reporting issue ${id} as spam.`)}
                  className="mt-2 text-red-400 hover:text-red-500 text-sm focus:outline-none flex items-center"
                >
                  <MdOutlineMailOutline className="mr-1" /> Report Spam
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
                  src="https://via.placeholder.com/600x400?text=Map+of+Location"
                  alt="Location Map"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 border-b border-gray-700 pb-2">Description</h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              {issue.description}
            </p>
          </div>

          {/* Activity Log */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 border-b border-gray-700 pb-2">Activity Log</h2>
            <ul className="space-y-3">
              {issue.activity.map((activityItem) => (
                <li key={activityItem.id} className="text-gray-200 text-sm sm:text-base flex items-start">
                  <FaCalendarAlt className="text-gray-400 mr-3 mt-1 flex-shrink-0" />
                  <span>{activityItem.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* "Mark as Resolved" button (if applicable) - Moved to bottom if not in header's "More Options" */}
          {issue.status !== 'Resolved' && issue.reportedBy === 'Jane Doe' && ( // Example conditional rendering
            <div className="flex justify-center mt-8 pt-4 border-t border-gray-700">
              <button
                onClick={() => alert(`Marking issue "${issue.title}" as Resolved!`)} // Placeholder for actual resolve logic
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center transition duration-300 ease-in-out transform hover:scale-105"
              >
                Mark as Resolved
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default IssueDetailPage;