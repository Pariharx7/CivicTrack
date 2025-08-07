import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import GlobalNav from '../components/GlobalNav';
import IssueCard from '../components/IssueCard';
import axios from 'axios';
import { calculateDistance } from "../utils/distance.js";

const MyIssuesPage = () => {
  const navigate = useNavigate();

  // State for issues, loading, error and also user location
  const [issues, setIssues] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user location once when component loads
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          console.warn("Could not get user location:", err);
          setUserLocation(null);
        }
      );
    } else {
      console.warn("Geolocation not supported by this browser.");
      setUserLocation(null);
    }
  }, []);

  // Fetch user's issues and compute distance once userLocation is known
  useEffect(() => {
    if (!userLocation) {
      // Optionally, you can fetch issues anyway without distance calculations
      fetchIssuesAndSetDistance(null);
    } else {
      fetchIssuesAndSetDistance(userLocation);
    }
  }, [userLocation]);

  const fetchIssuesAndSetDistance = async (loc) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:3000/api/issues/my", {
        withCredentials: true,
      });

      let fetchedIssues = response.data.data || [];

      if (loc) {
        // Calculate distance for each issue relative to user location
        fetchedIssues = fetchedIssues.map(issue => {
          const [lng, lat] = issue.location.coordinates;
          const distance = calculateDistance(loc.lat, loc.lng, lat, lng);
          return { ...issue, distance: distance.toFixed(1) }; // string with 1 decimal place
        });
      } else {
        // No user location, distance not available
        fetchedIssues = fetchedIssues.map(issue => ({ ...issue, distance: null }));
      }

      setIssues(fetchedIssues);
    } catch (err) {
      console.error('Failed to fetch user issues:', err);
      setError('Failed to load your issues. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReportNewIssue = () => {
    navigate('/report-issue');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8 text-white">
      <GlobalNav />

      <main className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8 md:p-10 text-white border border-gray-700 mt-8">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 pb-2 border-b border-gray-700">
          Your Reported Issues
        </h3>

        {loading && <p className="text-gray-300">Loading your reported issues...</p>}

        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && issues.length === 0 && (
          <>
            <p className="text-gray-300 leading-relaxed">
              You have not reported any issues yet.
            </p>
            <div className="mt-8 p-6 bg-gray-700 text-center rounded-lg border border-gray-600">
              <p className="text-lg text-gray-300">Don't see your issues? Report a new one!</p>
              <button
                onClick={handleReportNewIssue}
                className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-5 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200 ease-in-out"
              >
                Report an Issue Now
              </button>
            </div>
          </>
        )}

        {!loading && !error && issues.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {issues.map(issue => (
              <Link to={`/detail/${issue._id}`} key={issue._id}>
                <IssueCard issue={issue} />
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyIssuesPage;
