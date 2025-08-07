// src/pages/ReportIssuePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import GlobalNav from '../components/GlobalNav';
import { FaUpload, FaMapMarkerAlt, FaTimesCircle } from 'react-icons/fa';
import LocationPickerMap from '../components/LocationPickerMap';

const ReportIssuePage = () => {
  const navigate = useNavigate();
  const [issueTitle, setIssueTitle] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [issueCategory, setIssueCategory] = useState('');
  const [issueLocation, setIssueLocation] = useState('');
  const [issueImage, setIssueImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const [showMap, setShowMap] = useState(false);
  const [userCurrentLocation, setUserCurrentLocation] = useState(null);
  const [selectedIssueCoordinates, setSelectedIssueCoordinates] = useState(null);

  // Get user's current location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        error => {
          alert("Could not get your current location. Please enable location services.");
          setUserCurrentLocation({ lat: 34.0833, lng: 74.8333 }); // fallback location
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setUserCurrentLocation({ lat: 34.0833, lng: 74.8333 });
    }
  }, []);

  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      setIssueImage(event.target.files[0]);
    }
  };

  const handleMapLocationSelect = ({ lat, lng, address }) => {
    setSelectedIssueCoordinates({ lat, lng });
    setIssueLocation(address);
    setShowMap(false);
  };

  const handleCloseMap = () => setShowMap(false);

  // Haversine formula to calculate distance between two lat-lng points in km
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedIssueCoordinates) {
      alert("Please select the issue's location on the map.");
      return;
    }
    if (userCurrentLocation) {
      const dist = calculateDistance(
        userCurrentLocation.lat,
        userCurrentLocation.lng,
        selectedIssueCoordinates.lat,
        selectedIssueCoordinates.lng
      );
      if (dist < 0 || dist > 5) {
        alert("The selected location must be within 0km and 5km from your current location.");
        return;
      }
    } else {
      alert("Your current location could not be determined. Please refresh and try again.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const formData = new FormData();
      formData.append('title', issueTitle);
      formData.append('description', issueDescription);
      formData.append('category', issueCategory);

      // Backend expects location as { type: 'Point', coordinates: [lng, lat] }
      const location = {
        type: 'Point',
        coordinates: [selectedIssueCoordinates.lng, selectedIssueCoordinates.lat],
      };
      formData.append('location', JSON.stringify({
  lat: selectedIssueCoordinates.lat,
  lng: selectedIssueCoordinates.lng
}));
      if (issueImage) {
        formData.append('photos', issueImage);
      }

      await axios.post('http://localhost:3000/api/issues/report', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      alert('Issue reported successfully!');
      navigate('/');
    } catch (error) {
      setSubmitError(error.response?.data?.message || error.message);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center pb-8 text-white">
      <GlobalNav />

      <main className="w-full max-w-2xl mt-8 bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8 md:p-10 border border-gray-700">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 pb-2 border-b border-gray-700 text-center">
          Report a New Issue
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          <div>
            <label htmlFor="title" className="block text-gray-300 text-sm font-semibold mb-2">Issue Title</label>
            <input
              type="text"
              id="title"
              value={issueTitle}
              onChange={(e) => setIssueTitle(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
              placeholder="e.g., Pothole on Main Road"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-300 text-sm font-semibold mb-2">Description</label>
            <textarea
              id="description"
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              rows="5"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400 resize-y"
              placeholder="Provide a detailed description of the issue..."
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="category" className="block text-gray-300 text-sm font-semibold mb-2">Category</label>
            <select
              id="category"
              value={issueCategory}
              onChange={(e) => setIssueCategory(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white appearance-none pr-8"
              required
            >
              <option value="" disabled>Select a category</option>
              <option value="Roads">Roads</option>
              <option value="Lighting">Lighting</option>
              <option value="Cleanliness">Cleanliness</option>
              <option value="Public Safety">Public Safety</option>
              <option value="Obstructions">Obstructions</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="location" className="block text-gray-300 text-sm font-semibold mb-2">Location</label>
            <div className="relative flex items-center">
              <input
                type="text"
                id="location"
                value={issueLocation}
                readOnly
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 cursor-not-allowed pr-10"
                placeholder="Select location from map"
                required
              />
              {issueLocation && (
                <button
                  type="button"
                  onClick={() => {
                    setIssueLocation('');
                    setSelectedIssueCoordinates(null);
                  }}
                  className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400 rounded-full p-1"
                  aria-label="Clear selected location"
                >
                  <FaTimesCircle className="text-xl" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowMap(true)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-1"
                aria-label="Pick location from map"
              >
                <FaMapMarkerAlt className="text-xl" />
              </button>
            </div>
            {!issueLocation && <p className="text-red-400 text-sm mt-1">Location is required. Please select from map.</p>}
          </div>

          <div>
            <label htmlFor="image-upload" className="block text-gray-300 text-sm font-semibold mb-2">Upload Photo/Video</label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                id="image-upload"
                accept="image/*,video/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="image-upload"
                className="flex items-center justify-center p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out text-sm font-semibold"
              >
                <FaUpload className="mr-2" />
                Choose File
              </label>
              {issueImage ? (
                <span className="text-gray-400 text-sm truncate max-w-[calc(100%-150px)]">{issueImage.name}</span>
              ) : (
                <span className="text-gray-500 text-sm">No file chosen</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out text-lg"
            disabled={isSubmitting || !selectedIssueCoordinates}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </button>

          {submitError && (
            <div className="text-red-400 text-center mt-4">
              {submitError}
            </div>
          )}
        </form>
      </main>

      {/* Location picker modal */}
      {showMap && userCurrentLocation && (
        <LocationPickerMap
          userLocation={userCurrentLocation}
          onLocationSelect={handleMapLocationSelect}
          onClose={handleCloseMap}
        />
      )}
      {showMap && !userCurrentLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 text-white text-lg">
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center">
            Fetching your current location to display the map...
            <button onClick={handleCloseMap} className="block mt-4 text-indigo-400 hover:text-indigo-300">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportIssuePage;
