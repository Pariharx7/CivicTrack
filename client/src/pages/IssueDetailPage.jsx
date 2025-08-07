import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DetailPageHeader from '../components/DetailPageHeader';
import Filters from '../components/Filters';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';

// Leaflet imports
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const IssueDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters (optional)
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [distanceFilter, setDistanceFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`http://localhost:3000/api/issues/${id}`, { withCredentials: true })
      .then((res) => {
        setIssue(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch issue:', err);
        setError('Issue not found or failed to load.');
        setLoading(false);
      });
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: issue?.title || 'CivicTrack Issue',
        text: issue?.description || 'Check out this issue on CivicTrack!',
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      alert(`Share not supported. Link: ${window.location.href}`);
    }
  };

  const handleMoreOptions = () => {
    alert('More options - coming soon');
  };

  const handleSearchIssues = () => {
    navigate(
      `/search?category=${categoryFilter}&status=${statusFilter}&distance=${distanceFilter}&query=${searchQuery}`
    );
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
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-red-400 text-lg">
        <DetailPageHeader title="Error" onShare={() => {}} onMoreOptions={() => {}} />
        <p className="mt-4">{error}</p>
        <button
          className="mt-4 px-4 py-2 bg-indigo-600 rounded-md text-white"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!issue) {
    return null; // Or render null while loading
  }

  // Extract latitude and longitude from GeoJSON (coordinates is [lng, lat])
  const longitude = issue.location?.coordinates?.[0];
  const latitude = issue.location?.coordinates?.[1];

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center">
      <DetailPageHeader title={issue.title} onShare={handleShare} onMoreOptions={handleMoreOptions} />

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

        {/* Image & Status */}
        <div className="w-full h-72 sm:h-96 md:h-[500px] overflow-hidden bg-gray-700 flex items-center justify-center relative">
          <img
            src={
              issue.imageUrl && issue.imageUrl.length > 0
                ? issue.imageUrl[0]
                : 'https://via.placeholder.com/800x450?text=No+Image'
            }
            alt={issue.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <span
            className={`absolute bottom-4 right-4 text-white text-sm sm:text-base font-bold px-4 py-2 rounded-full shadow-lg z-10
              ${(issue.status || '').toLowerCase() === 'resolved'
                ? 'bg-green-600'
                : (issue.status || '').toLowerCase() === 'in-progress'
                ? 'bg-yellow-600'
                : 'bg-red-600'}
            `}
          >
            {issue.status?.charAt(0).toUpperCase() + issue.status?.slice(1)}
          </span>
        </div>

        <div className="p-6 sm:p-8 md:p-10 space-y-7">

          {/* Status and Reported By */}
          <div className="flex justify-between items-center mb-4 text-sm sm:text-base">
            <span
              className={`px-3 py-1 rounded-full font-semibold ${
                (issue.status || '').toLowerCase() === 'in-progress' ? 'bg-yellow-500 text-black' : 'bg-gray-600'
              }`}
            >
              Status: {issue.status}
            </span>

            <span className="text-gray-300">Reported by: {issue.reportedBy?.username || 'Unknown'}</span>
          </div>

          {/* Date, Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-700 p-4 rounded-md">
              <p className="text-sm font-medium text-gray-300">Date & Time</p>
              <p className="text-lg font-semibold">{new Date(issue.createdAt).toLocaleString()}</p>
              {issue.reportedBy?.username === 'Anonymous' && (
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
                {latitude && longitude ? (
                  <>
                    Lat: {latitude.toFixed(6)}, Lng: {longitude.toFixed(6)}
                  </>
                ) : (
                  'Location data not available'
                )}
              </p>

              {/* Leaflet Map Rendering */}
              {latitude && longitude && (
                <div className="mt-2 h-48 w-full rounded-md overflow-hidden">
                  <MapContainer
                    center={[latitude, longitude]}
                    zoom={15}
                    scrollWheelZoom={false}
                    className="w-full h-full"
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution="&copy; OpenStreetMap contributors"
                    />
                    <Marker position={[latitude, longitude]}>
                      <Popup>
                        {issue.title}
                        <br />
                        Lat: {latitude.toFixed(6)}, Lng: {longitude.toFixed(6)}
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-bold text-white mb-3 border-b border-gray-700 pb-2">Description</h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{issue.description}</p>
          </div>

          {/* Activity Log */}
          <div>
            <h2 className="text-xl font-bold text-white mb-3 border-b border-gray-700 pb-2">Activity Log</h2>
            <ul className="space-y-3">
              {(issue.logs || []).map((log, idx) => (
                <li key={idx} className="text-gray-200 text-sm sm:text-base flex items-start">
                  <FaCalendarAlt className="text-gray-400 mr-3 mt-1 flex-shrink-0" />
                  <span>
                    {`${new Date(log.updatedAt).toLocaleString()} - Status: ${log.status} - ${log.comment || ''}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Example action button */}
          {(issue.status || '').toLowerCase() !== 'resolved' && issue.reportedBy?.username === 'Jane Doe' && (
            <div className="flex justify-center mt-8 pt-4 border-t border-gray-700">
              <button
                onClick={() => alert(`Marking issue "${issue.title}" as Resolved!`)}
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
