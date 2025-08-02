// src/pages/ReportIssuePage.jsx
import React, { useState } from 'react';
import ReportIssueHeader from '../components/ReportIssueHeader'; 
import { FaPlus, FaMapMarkerAlt } from 'react-icons/fa'; 

const ReportIssuePage = () => {
  const [photos, setPhotos] = useState([]);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [reportAnonymous, setReportAnonymous] = useState(false);
  const [location, setLocation] = useState('Auto-detected via GPS or manual pin-drop.'); // Placeholder for location text

  const handlePhotoUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    // Limit to 5 photos as per design
    setPhotos((prevPhotos) => [...prevPhotos, ...uploadedFiles].slice(0, 5));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically send this data to your backend API
    const formData = new FormData();
    photos.forEach((photo, index) => {
      formData.append(`photo${index}`, photo);
    });
    formData.append('category', category);
    formData.append('description', description);
    formData.append('reportAnonymous', reportAnonymous);
    formData.append('location', location); // In a real app, this would be lat/lng or a more precise address

    console.log('Submitting Issue:', {
      photos: photos.map(file => file.name), // Just names for console log
      category,
      description,
      reportAnonymous,
      location,
    });


    // Reset form after submission (optional)
    setPhotos([]);
    setCategory('');
    setDescription('');
    setReportAnonymous(false);
    alert('Issue submitted (check console for data)!');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center">
      {/* Reusing the ReportIssueHeader component */}
      <ReportIssueHeader />

      <main className="flex-grow w-full max-w-md p-4 sm:p-6 lg:p-8 bg-gray-800 rounded-lg shadow-lg my-8 mx-auto text-white">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Add/Upload Photos Section */}
          <div>
            <label htmlFor="photos" className="block text-sm font-medium text-gray-300 mb-2">
              Add/Upload Photos (up to 5 photos)
            </label>
            <div className="relative flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg p-6 bg-gray-700 hover:border-gray-500 transition-colors duration-200 cursor-pointer h-32">
              <input
                id="photos"
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="text-center">
                <FaPlus className="mx-auto h-8 w-8 text-gray-400" />
                <span className="mt-2 block text-sm font-medium text-gray-400">
                  Click to add photos
                </span>
                {photos.length > 0 && (
                  <span className="text-xs text-gray-400 mt-1">
                    ({photos.length} photo(s) selected)
                  </span>
                )}
              </div>
            </div>
            {photos.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {photos.map((photo, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(photo)}
                    alt={`Uploaded ${index + 1}`}
                    className="w-16 h-16 object-cover rounded-md border border-gray-600"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Map Section (Placeholder) */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Issue Location</label>
            <div className="relative w-full h-48 bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center border border-gray-600">
              {/* This is a placeholder for the map image */}
              <img
                src="https://via.placeholder.com/400x200?text=Map+Placeholder" // Use a real map image or map component later
                alt="Map showing issue location"
                className="absolute inset-0 w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                <FaMapMarkerAlt className="text-red-500 text-3xl z-10" />
                <p className="text-sm text-white text-center ml-2">{location}</p>
              </div>
              {/* In a real app, you'd integrate a map component here (e.g., React Leaflet, Google Maps React) */}
              {/* You'd also handle logic for auto-detecting via GPS or manual pin-drop */}
            </div>
            <p className="mt-2 text-xs text-gray-400">
              Auto-detected via GPS or manual pin-drop.
            </p>
          </div>

          {/* Category Dropdown */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none pr-8"
            >
              <option value="">Select a category</option>
              <option value="Roads">Roads & Potholes</option>
              <option value="Waste">Waste Management</option>
              <option value="Water">Water Supply</option>
              <option value="Electricity">Electricity Outage</option>
              <option value="PublicSafety">Public Safety</option>
              <option value="Other">Other</option>
            </select>
            {/* Custom arrow for select, as appearance-none removes default */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/></svg>
            </div>
          </div>

          {/* Description Textarea */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder-gray-400 resize-y"
              placeholder="Provide a detailed description of the issue..."
            ></textarea>
          </div>

          {/* Report Anonymous Checkbox */}
          <div className="flex items-center">
            <input
              id="reportAnonymous"
              name="reportAnonymous"
              type="checkbox"
              checked={reportAnonymous}
              onChange={(e) => setReportAnonymous(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded bg-gray-700"
            />
            <label htmlFor="reportAnonymous" className="ml-2 block text-sm text-gray-300">
              Report Anonymous
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
            >
              Submit Issue
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ReportIssuePage;