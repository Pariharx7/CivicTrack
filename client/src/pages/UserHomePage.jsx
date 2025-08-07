// src/pages/UserHomePage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserHomePageHeader from "../components/UserHomePageHeader";
import IssueCard from "../components/IssueCard";
import Filters from "../components/Filters";
import { Link, useNavigate } from "react-router-dom";

// Utility for distance calculation (Haversine formula)
function calculateDistance(lat1, lng1, lat2, lng2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const UserHomePage = () => {
  const navigate = useNavigate();

  // Filters and search states
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [distanceFilter, setDistanceFilter] = useState(""); // e.g., "3" for 3 km
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination states
  const [issues, setIssues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const issuesPerPage = 9;

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // User's geographic location
  const [userLocation, setUserLocation] = useState(null);

  // Get user location on mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          console.warn("Geolocation error:", err);
          setUserLocation(null); // Let backend handle if no location provided
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      console.warn("Geolocation not supported");
      setUserLocation(null);
    }
  }, []);

  // Fetch issues whenever dependencies change including user location
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
        if (distanceFilter) params.radius = parseFloat(distanceFilter);
        if (searchQuery) params.search = searchQuery;

        // Include lat and lng if available
        if (userLocation) {
          params.lat = userLocation.lat;
          params.lng = userLocation.lng;
        }

        const res = await axios.get("http://localhost:3000/api/issues/nearby", {
          params,
          withCredentials: true,
        });

        const data = res.data?.data;

        let fetchedIssues = [];

        if (Array.isArray(data)) {
          // API returns array of issues without pagination (fallback)
          fetchedIssues = data;
          setTotalPages(1);
        } else if (data?.issues) {
          fetchedIssues = data.issues;
          setTotalPages(data.pagination?.totalPages || 1);
        } else {
          fetchedIssues = [];
          setTotalPages(1);
        }

        // Calculate distance client-side for each issue if user location known
        if (userLocation) {
          fetchedIssues = fetchedIssues.map((issue) => {
            if (
              issue.location &&
              issue.location.coordinates &&
              issue.location.coordinates.length === 2
            ) {
              const [lng, lat] = issue.location.coordinates;
              const dist = calculateDistance(
                userLocation.lat,
                userLocation.lng,
                lat,
                lng
              );
              return { ...issue, distance: dist.toFixed(1) };
            }
            return { ...issue, distance: null };
          });
        }

        setIssues(fetchedIssues);
      } catch (e) {
        console.error("Failed fetching issues:", e);
        setError(
          e.response?.data?.message ||
            "Failed to load issues. Please try again later."
        );
        setIssues([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [
    currentPage,
    categoryFilter,
    statusFilter,
    distanceFilter,
    searchQuery,
    userLocation,
  ]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 rounded-md font-semibold ${
            currentPage === i
              ? "bg-indigo-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          } transition duration-200 ease-in-out`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center">
      {/* User Home Page Header */}
      <UserHomePageHeader />

      {/* Filters */}
      <Filters
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        distanceFilter={distanceFilter}
        setDistanceFilter={setDistanceFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      <main className="flex-grow w-full max-w-7xl p-4 sm:p-6 lg:p-8">
        {loading && (
          <p className="text-white text-center text-lg">Loading issues...</p>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {!loading && !error && (
          <>
            {issues.length === 0 ? (
              <p className="text-white text-center">No issues found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {issues.map((issue) => (
                  <Link to={`/detail/${issue._id}`} key={issue._id}>
                    <IssueCard issue={issue} />
                  </Link>
                ))}
              </div>
            )}

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
          </>
        )}
      </main>
    </div>
  );
};

export default UserHomePage;
