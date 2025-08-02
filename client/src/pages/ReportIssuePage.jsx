// src/pages/ReportIssuePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalNav from '../components/GlobalNav'; // Use GlobalNav here too
import { FaUpload, FaMapMarkerAlt } from 'react-icons/fa'; // Icons for upload and location

const ReportIssuePage = () => {
  const navigate = useNavigate();
  const [issueTitle, setIssueTitle] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [issueCategory, setIssueCategory] = useState('');
  const [issueLocation, setIssueLocation] = useState('');
  const [issueImage, setIssueImage] = useState(null); // For file object

  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      setIssueImage(event.target.files[0]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // In a real application, you would send this data to a backend API
    console.log({
      issueTitle,
      issueDescription,
      issueCategory,
      issueLocation,
      issueImage: issueImage ? issueImage.name : 'No Image',
    });
    alert('Issue reported successfully! (Data logged to console)');
    navigate('/'); // Redirect to homepage or My Issues page after reporting
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center pb-8 text-white">
      <GlobalNav /> {/* Global Navigation */}

      <main className="w-full max-w-2xl mt-8 bg-gray-800 rounded-lg shadow-xl p-6 sm:p-8 md:p-10 border border-gray-700">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 pb-2 border-b border-gray-700 text-center">
          Report a New Issue
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Issue Title */}
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

          {/* Issue Description */}
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

          {/* Category */}
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
              <option value="Roads & Potholes">Roads & Potholes</option>
              <option value="Lighting">Lighting</option>
              <option value="Cleanliness & Waste Management">Cleanliness & Waste Management</option>
              <option value="Public Amenities">Public Amenities</option>
              <option value="Water & Sanitation">Water & Sanitation</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-gray-300 text-sm font-semibold mb-2">Location</label>
            <div className="relative">
              <input
                type="text"
                id="location"
                value={issueLocation}
                onChange={(e) => setIssueLocation(e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400 pr-10"
                placeholder="e.g., Near City Park, Elm Street"
                required
              />
              <button
                type="button" // Important: type="button" to prevent form submission
                onClick={() => alert('Integrate Map/Location picker here!')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-1"
                aria-label="Pick location from map"
              >
                <FaMapMarkerAlt className="text-xl" />
              </button>
            </div>
          </div>

          {/* Upload Photo/Video */}
          <div>
            <label htmlFor="image-upload" className="block text-gray-300 text-sm font-semibold mb-2">Upload Photo/Video</label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                id="image-upload"
                accept="image/*,video/*"
                onChange={handleImageUpload}
                className="hidden" // Hide the default file input
              />
              <label
                htmlFor="image-upload"
                className="flex items-center justify-center p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out text-sm font-semibold"
              >
                <FaUpload className="mr-2" />
                Choose File
              </label>
              {issueImage && <span className="text-gray-400 text-sm truncate max-w-[calc(100%-150px)]">{issueImage.name}</span>}
              {!issueImage && <span className="text-gray-500 text-sm">No file chosen</span>}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out text-lg"
          >
            Submit Report
          </button>
        </form>
      </main>
    </div>
  );
};

export default ReportIssuePage;