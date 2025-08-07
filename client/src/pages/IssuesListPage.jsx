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