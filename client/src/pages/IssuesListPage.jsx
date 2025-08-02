// src/pages/IssuesListPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import GlobalNav from '../components/GlobalNav'; // <--- NEW: Import GlobalNav
import Filters from '../components/Filters';
import IssueCard from '../components/IssueCard';

const IssuesListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for the filter/search elements (controlled by Filters component)
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || '');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || '');
  const [distanceFilter, setDistanceFilter] = useState(searchParams.get('distance') || '');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '');

  // Dummy Data (move to a separate data file or fetch from API later)
  const allIssues = [
    {
      id: '1',
      imageUrl: 'https://images.unsplash.com/photo-1560782202-154b39d57ef2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG90aG9sZXN8ZW58MHx8MHx8fDA%3D',
      title: 'Pothole on Main Road',
      status: 'In Progress',
      statusDate: 'Jun 02, 2025 - 10:34 AM',
      description: `The main road in C.G road, Ahmedabad, is riddled with potholes, making it dangerous and difficult to travel on. We kindly request the municipal authorities to address this issue promptly to ensure the safety of commuters. The pothole is roughly 2 meters wide and 15 cm deep, located directly after the main traffic light when heading towards the city center.`,
      category: 'Roads & Potholes',
      locationName: 'C.G Road, Ahmedabad, Gujarat',
      distance: '1.1 km',
      reportedBy: 'Jane Doe',
      contactEmail: 'jane.doe@example.com',
      activity: [],
    },
    {
      id: '2',
      imageUrl: 'https://via.placeholder.com/600x400?text=Streetlight+Issue+Night',
      title: 'Streetlight Not Working in Sector 10',
      status: 'Reported',
      statusDate: 'July 20, 2025 - 07:00 PM',
      description: 'Streetlight pole #456 on Elm Street has been out for over a week, making the area very dark and unsafe at night.',
      category: 'Lighting',
      locationName: 'Elm Street, Sector 10, Vijaypur',
      distance: '0.5 km',
      reportedBy: 'Anonymous',
      contactEmail: null,
      activity: [],
    },
    {
        id: '3',
        imageUrl: 'https://via.placeholder.com/600x400?text=Overflowing+Dustbin',
        title: 'Overflowing Public Dustbin near Market',
        status: 'Resolved',
        statusDate: 'August 01, 2025 - 09:30 AM',
        description: 'The public dustbin located at the corner of Main Market Road and Temple Lane is consistently overflowing, spilling waste onto the pavement.',
        category: 'Cleanliness & Waste Management',
        locationName: 'Main Market Road, Vijaypur',
        distance: '0.2 km',
        reportedBy: 'CivicSense',
        contactEmail: 'civicsense@example.com',
        activity: [],
    },
    {
      id: '4',
      imageUrl: 'https://via.placeholder.com/600x400?text=Broken+Bench+Park',
      title: 'Broken Park Bench in Central Park',
      status: 'Reported',
      statusDate: 'August 10, 2025 - 02:00 PM',
      description: 'One of the wooden benches in Central Park near the children\'s play area has a broken slat, making it unsafe to sit on.',
      category: 'Public Amenities',
      locationName: 'Central Park, Vijaypur',
      distance: '1.5 km',
      reportedBy: 'Park Visitor',
      contactEmail: null,
      activity: [],
    },
    {
      id: '5',
      imageUrl: 'https://via.placeholder.com/600x400?text=Illegal+Dumping',
      title: 'Illegal Waste Dumping on Riverside',
      status: 'In Progress',
      statusDate: 'July 28, 2025 - 04:30 PM',
      description: 'A large pile of construction debris and household waste has been illegally dumped along the riverside path, creating an eyesore and environmental hazard.',
      category: 'Cleanliness & Waste Management',
      locationName: 'Riverside Path, near Old Bridge',
      distance: '3.0 km',
      reportedBy: 'Environmental Watch',
      contactEmail: 'env.watch@example.com',
      activity: [],
    },
  ];

  // Function to apply filters and update URL
  const handleApplyFilters = () => {
    const params = new URLSearchParams();
    if (categoryFilter) params.set('category', categoryFilter);
    if (statusFilter) params.set('status', statusFilter);
    if (distanceFilter) params.set('distance', distanceFilter);
    if (searchQuery) params.set('query', searchQuery);
    setSearchParams(params); // This updates the URL
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    let filteredIssues = allIssues;

    // Apply filters based on URL search parameters
    const currentCategory = searchParams.get('category');
    const currentStatus = searchParams.get('status');
    const currentDistance = searchParams.get('distance');
    const currentQuery = searchParams.get('query');

    if (currentCategory) {
      filteredIssues = filteredIssues.filter(issue => issue.category === currentCategory);
    }
    if (currentStatus) {
      filteredIssues = filteredIssues.filter(issue => issue.status === currentStatus);
    }
    if (currentDistance) {
      const distValue = parseFloat(currentDistance.replace('km', ''));
      filteredIssues = filteredIssues.filter(issue => parseFloat(issue.distance) <= distValue);
    }
    if (currentQuery) {
      const lowerCaseQuery = currentQuery.toLowerCase();
      filteredIssues = filteredIssues.filter(issue =>
        issue.title.toLowerCase().includes(lowerCaseQuery) ||
        issue.description.toLowerCase().includes(lowerCaseQuery) ||
        issue.locationName.toLowerCase().includes(lowerCaseQuery) ||
        issue.category.toLowerCase().includes(lowerCaseQuery)
      );
    }

    setIssues(filteredIssues);
    setLoading(false);

    // Also ensure internal state matches URL params if page was navigated via URL
    setCategoryFilter(currentCategory || '');
    setStatusFilter(currentStatus || '');
    setDistanceFilter(currentDistance || '');
    setSearchQuery(currentQuery || '');

  }, [searchParams]); // Re-run effect when searchParams change

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white text-lg">
        <p>Loading issues...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-red-400 text-lg">
        <p className="mt-4">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center">
      {/* NEW: Use GlobalNav instead of AppHeader */}
      <GlobalNav />

      {/* Filters Section */}
      <div className="w-full max-w-4xl px-4 sm:px-0 mt-8 mb-8">
        <Filters
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          distanceFilter={distanceFilter}
          setDistanceFilter={setDistanceFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onApplyFilters={handleApplyFilters}
        />
      </div>

      {/* Issues List */}
      <main className="w-full max-w-4xl px-4 sm:px-0 pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {issues.length > 0 ? (
          issues.map(issue => (
            <IssueCard key={issue.id} issue={issue} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 text-lg p-8 bg-gray-800 rounded-lg border border-gray-700 shadow-md">
            No issues found matching your criteria.
          </div>
        )}
      </main>
    </div>
  );
};

export default IssuesListPage;