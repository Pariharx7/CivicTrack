// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import HomePageHeader from '../components/HomePageHeader';
import IssueCard from '../components/IssueCard';
import Filters from '../components/Filters';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // or import your pre-configured axios instance

const HomePage = () => {
  const navigate = useNavigate();

  // Filters and search states
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [distanceFilter, setDistanceFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Issues and pagination states
  const [issues, setIssues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const issuesPerPage = 9;

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIssues = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = {
          page: currentPage,
          limit: issuesPerPage,
        };
        if (categoryFilter) params.category = categoryFilter;
        if (statusFilter) params.status = statusFilter;
        if (distanceFilter) params.distance = distanceFilter;
        if (searchQuery) params.search = searchQuery;

        const res = await axios.get('http://localhost:3000/api/issues', {
          params,
          withCredentials: true, // include cookies if your backend requires authentication
        });

        const data = res.data?.data;

        if (data?.issues) {
          setIssues(data.issues);
          setTotalPages(data.pagination?.totalPages || 1);
        } else if (Array.isArray(data)) {
          // fallback if backend returns array directly without pagination
          setIssues(data);
          setTotalPages(1);
        } else {
          setIssues([]);
          setTotalPages(1);
        }
      } catch (err) {
        console.error('Failed to fetch issues:', err);
        setError('Failed to load issues. Please try again later.');
        setIssues([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [currentPage, categoryFilter, statusFilter, distanceFilter, searchQuery]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderPaginationButtons = () => {
    const pages = [];
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
    setCurrentPage(1); // reset to first page on new search/filter change
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center">
      {/* Header component */}
      <HomePageHeader />

      {/* Filters component */}
      <Filters
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        distanceFilter={distanceFilter}
        setDistanceFilter={setDistanceFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchIssues={handleSearchIssues}
      />

      <main className="flex-grow w-full max-w-4xl p-4 sm:p-6 lg:p-8">
        {loading && <p className="text-white text-center text-lg">Loading issues...</p>}

        {error && <p className="text-red-500 text-center">{error}</p>}

        {!loading && !error && (
          <>
            {issues.length === 0 ? (
              <p className="text-white text-center text-lg col-span-full">No issues found matching your criteria.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {issues.map((issue) => (
                  <Link to={`/detail/${issue._id}`} key={issue._id}>
                    <IssueCard issue={issue} />
                  </Link>
                ))}
              </div>
            )}

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
          </>
        )}
      </main>
    </div>
  );
};

export default HomePage;
