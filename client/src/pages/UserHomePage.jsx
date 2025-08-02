// src/pages/UserHomePage.jsx
import React, { useState, useEffect } from 'react';
import UserHomePageHeader from '../components/UserHomePageHeader';
import IssueCard from '../components/IssueCard';
import { FaSearch } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom'; // <--- Added Link here!

const UserHomePage = () => {
  const navigate = useNavigate();

  // States for filters and search
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [distanceFilter, setDistanceFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // States for issues and pagination
  const [issues, setIssues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const issuesPerPage = 9; // Displaying 3x3 grid as per image

  useEffect(() => {
    // Simulate fetching issues based on current page and filters
    // In a real app, you'd also include a user ID to fetch 'My issues'
    const fetchIssues = async () => {
      // Dummy data for demonstration. For 'My issues', you'd typically filter
      // this data based on a logged-in user's ID.
      const allDummyIssues = [
        {
          id: 1,
          imageUrl: 'https://via.placeholder.com/400x250?text=Streetlight+not+working',
          title: 'Streetlight not working',
          status: 'In Progress',
          statusDate: 'Aug 14',
          description: 'Street light not working since last 2 days.',
          locationName: 'pota bridge, ahmedabad,gujarat',
          distance: '2.8',
        },
        {
          id: 2,
          imageUrl: 'https://via.placeholder.com/400x250?text=Pothole+on+main+road',
          title: 'Pothole on main road',
          status: 'Reported',
          statusDate: 'Jun 02',
          description: 'The main road in c.g road,ahmedabad, is riddled with potholes, making it dangerous and difficult to travel on.',
          locationName: 'C.G road, ahmedabad,gujarat',
          distance: '1.1',
        },
        {
          id: 3,
          imageUrl: 'https://via.placeholder.com/400x250?text=Garbage+not+collected',
          title: 'Garbage not collected',
          status: 'Reported',
          statusDate: 'Jan 25',
          description: 'Garbage is not collected since week\'s end had and very difficult to leave here.',
          locationName: 'IT society, ahmedabad,gujarat',
          distance: '1.1',
        },
        {
          id: 4,
          imageUrl: 'https://via.placeholder.com/400x250?text=Streetlight+not+working',
          title: 'Streetlight not working',
          status: 'In Progress',
          statusDate: 'Aug 14',
          description: 'Street light not working since last 2 days.',
          locationName: 'pota bridge, ahmedabad,gujarat',
          distance: '2.8',
        },
        {
          id: 5,
          imageUrl: 'https://via.placeholder.com/400x250?text=Pothole+on+main+road',
          title: 'Pothole on main road',
          status: 'Reported',
          statusDate: 'Jun 02',
          description: 'The main road in c.g road,ahmedabad, is riddled with potholes, making it dangerous and difficult to travel on.',
          locationName: 'C.G road, ahmedabad,gujarat',
          distance: '1.1',
        },
        {
          id: 6,
          imageUrl: 'https://via.placeholder.com/400x250?text=Garbage+not+collected',
          title: 'Garbage not collected',
          status: 'Reported',
          statusDate: 'Jan 26',
          description: 'Garbage is not collected since week\'s end had and very difficult to leave here.',
          locationName: 'IT society, ahmedabad,gujarat',
          distance: '1.1',
        },
        {
          id: 7,
          imageUrl: 'https://via.placeholder.com/400x250?text=Streetlight+not+working',
          title: 'Streetlight not working',
          status: 'In Progress',
          statusDate: 'Aug 14',
          description: 'Street light not working since last 2 days.',
          locationName: 'pota bridge, ahmedabad,gujarat',
          distance: '2.8',
        },
        {
          id: 8,
          imageUrl: 'https://via.placeholder.com/400x250?text=Pothole+on+main+road',
          title: 'Pothole on main road',
          status: 'Reported',
          statusDate: 'Jun 02',
          description: 'The main road in c.g road,ahmedabad, is riddled with potholes, making it dangerous and difficult to travel on.',
          locationName: 'C.G road, ahmedabad,gujarat',
          distance: '1.1',
        },
        {
          id: 9,
          imageUrl: 'https://via.placeholder.com/400x250?text=Garbage+not+collected',
          title: 'Garbage not collected',
          status: 'Reported',
          statusDate: 'Jan 28',
          description: 'Garbage is not collected since week\'s end had and very difficult to leave here.',
          locationName: 'IT society, ahmedabad,gujarat',
          distance: '1.1',
        },
        // Add more dummy issues to simulate more pages
        {
          id: 10,
          imageUrl: 'https://via.placeholder.com/400x250?text=Broken+bench',
          title: 'Broken park bench',
          status: 'Reported',
          statusDate: 'May 10',
          description: 'Bench in central park is broken and unsafe.',
          locationName: 'Central Park, ahmedabad',
          distance: '0.5',
        },
        {
          id: 11,
          imageUrl: 'https://via.placeholder.com/400x250?text=Overflowing+bin',
          title: 'Overflowing Public Bin',
          status: 'In Progress',
          statusDate: 'July 01',
          description: 'Public dustbin near market is overflowing, attracting pests.',
          locationName: 'Market Road, ahmedabad',
          distance: '0.8',
        },
        {
          id: 12,
          imageUrl: 'https://via.placeholder.com/400x250?text=Graffiti+on+wall',
          title: 'Graffiti on bridge wall',
          status: 'Resolved',
          statusDate: 'April 20',
          description: 'Unsightly graffiti on the underpass wall.',
          locationName: 'Underpass Bridge, ahmedabad',
          distance: '3.2',
        },
      ];

      // Apply filters
      let filteredIssues = allDummyIssues.filter(issue => {
        const matchesCategory = categoryFilter ? issue.title.toLowerCase().includes(categoryFilter.toLowerCase()) : true; // Simple contains for dummy
        const matchesStatus = statusFilter ? issue.status === statusFilter : true;
        const matchesQuery = searchQuery ? issue.title.toLowerCase().includes(searchQuery.toLowerCase()) || issue.description.toLowerCase().includes(searchQuery.toLowerCase()) : true;
        // Distance filtering would be more complex, involving user's location and issue's coordinates
        const matchesDistance = distanceFilter ? true : true; // Placeholder for now

        // For 'My issues', you would add a filter like: issue.reporterId === loggedInUserId
        // For this dummy data, we'll just show all of them as if they were 'my issues'
        return matchesCategory && matchesStatus && matchesDistance && matchesQuery;
      });

      setTotalPages(Math.ceil(filteredIssues.length / issuesPerPage));

      const startIndex = (currentPage - 1) * issuesPerPage;
      const endIndex = startIndex + issuesPerPage;
      setIssues(filteredIssues.slice(startIndex, endIndex));
    };

    fetchIssues();
  }, [currentPage, categoryFilter, statusFilter, distanceFilter, searchQuery]); // Re-fetch on filter/page change

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderPaginationButtons = () => {
    const pages = [];
    // Show current page, and 2 pages before/after (if available)
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded-md font-semibold ${
            currentPage === i
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          } transition duration-200 ease-in-out`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  const handleSearchIssues = () => {
    // This function can trigger a re-fetch of issues with the new search query
    setCurrentPage(1); // Reset to first page on new search
  };


  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center">
      {/* User Home Page Header */}
      <UserHomePageHeader />

      {/* Filter/Search Bar Section */}
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
                <option value="Waste">Waste</option>
                <option value="Streetlight">Streetlight</option>
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
              <span className="hidden sm:inline">Search Issues</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow w-full max-w-4xl p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {issues.length > 0 ? (
            issues.map((issue) => (
              <Link to={`/detail/${issue.id}`} key={issue.id}>
                <IssueCard issue={issue} />
              </Link>
            ))
          ) : (
            <p className="text-white text-center text-lg col-span-full">No issues found matching your criteria.</p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 ease-in-out"
            >
              &lt;
            </button>
            {renderPaginationButtons()}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 ease-in-out"
            >
              &gt;
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserHomePage;