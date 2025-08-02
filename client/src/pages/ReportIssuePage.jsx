// src/pages/ReportIssuePage.jsx
import React, { useState } from 'react';
import ReportIssueHeader from '../components/ReportIssueHeader';
import { FaPlus, FaMapMarkerAlt, FaTimesCircle } from 'react-icons/fa'; // Added FaTimesCircle for removing photos

const ReportIssuePage = () => {
  const [photos, setPhotos] = useState([]);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reportAnonymous, setReportAnonymous] = useState(false);
  const [location, setLocation] = useState('Auto-detected via GPS or manual pin-drop.'); // Placeholder for location text

  const handlePhotoUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    // Filter out files that are not images or exceed a certain size if needed
    // Limit to 5 photos as per design
    const newPhotos = [...photos, ...uploadedFiles].slice(0, 5);
    setPhotos(newPhotos);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos(photos.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Basic validation
    if (!category || !title || !description || photos.length === 0) {
      alert('Please fill in all required fields and upload at least one photo.');
      return;
    }

    // Here you would typically send this data to your backend API
    const formData = new FormData();
    photos.forEach((photo, index) => {
      formData.append(`photo${index}`, photo);
    });
    formData.append('category', category);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('reportAnonymous', reportAnonymous);
    formData.append('location', location); // In a real app, this would be lat/lng or a more precise address

    console.log('Submitting Issue:', {
      photos: photos.map(file => file.name), // Just names for console log
      category,
      title,
      description,
      reportAnonymous,
      location,
    });


    // Reset form after successful submission
    setPhotos([]);
    setCategory('');
    setTitle('');
    setDescription('');
    setReportAnonymous(false);
    alert('Issue submitted successfully!');
    // Optionally navigate to a confirmation page or user's home page
    // navigate('/user-home');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center">
      {/* ReportIssueHeader component */}
      <ReportIssueHeader />

      <main className="flex-grow w-full max-w-2xl p-6 sm:p-8 lg:p-10 bg-gray-800 rounded-xl shadow-2xl my-8 mx-auto text-white border border-gray-700">
        <h2 className="text-3xl font-extrabold text-white mb-8 text-center">Report a New Issue</h2>
        <form onSubmit={handleSubmit} className="space-y-7"> {/* Increased space-y */}

          {/* Add/Upload Photos Section */}
          <div>
            <label htmlFor="photos" className="block text-sm font-semibold text-gray-200 mb-2">
              Add/Upload Photos <span className="text-red-400">*</span> (up to 5)
            </label>
            <div className="relative flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg p-6 bg-gray-700 hover:border-indigo-500 transition-colors duration-200 cursor-pointer h-36 group">
              <input
                id="photos"
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="text-center">
                <FaPlus className="mx-auto h-10 w-10 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-200" />
                <span className="mt-2 block text-md font-medium text-gray-300 group-hover:text-white">
                  Click to add photos
                </span>
                {photos.length > 0 && (
                  <span className="text-sm text-gray-400 mt-1">
                    ({photos.length} photo(s) selected)
                  </span>
                )}
              </div>
            </div>
            {photos.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-3 justify-center">
                {photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Uploaded ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-lg border-2 border-gray-600 shadow-md"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(index)}
                      className="absolute -top-2 -right-2 text-red-500 hover:text-red-700 bg-gray-900 rounded-full p-1"
                      aria-label="Remove photo"
                    >
                      <FaTimesCircle className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Map Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">Issue Location</label>
            <div className="relative w-full h-64 bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center border border-gray-600">
              {/* This is a more visually appealing placeholder for the map image */}
              <img
                src="https://www.google.com/maps/about/images/desktop-about-us.png" // More realistic map placeholder
                alt="Map showing issue location"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white p-4">
                <FaMapMarkerAlt className="text-indigo-400 text-4xl animate-bounce-custom" /> {/* Custom bounce animation */}
                <p className="mt-3 text-lg font-medium text-center">
                  {location}
                </p>
                <button
                  type="button"
                  className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-sm font-semibold transition duration-200 ease-in-out shadow-lg"
                  onClick={() => alert('Map interaction functionality to be implemented!')}
                >
                  Locate on Map
                </button>
              </div>
              {/* In a real app, you'd integrate a map component here (e.g., React Leaflet, Google Maps React) */}
            </div>
            <p className="mt-2 text-xs text-gray-400 text-center">
              (Auto-detected via GPS or manually pinned on the map)
            </p>
          </div>

          {/* Category Dropdown */}
          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-gray-200 mb-2">
              Category <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base appearance-none pr-10"
                required
              >
                <option value="" disabled>Select a category</option>
                <option value="Roads">Roads & Potholes</option>
                <option value="Lighting">Lighting (Streetlights, etc.)</option>
                <option value="WaterSupply">Water Supply & Leakage</option>
                <option value="Cleanliness">Cleanliness & Waste Management</option>
                <option value="PublicSafety">Public Safety (Crime, etc.)</option>
                <option value="Obstructions">Obstructions (Fallen trees, etc.)</option>
                <option value="Other">Other</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/></svg>
              </div>
            </div>
          </div>

          {/* Title Input */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-200 mb-2">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base placeholder-gray-400"
              placeholder="e.g., Pothole on Main Street"
              required
              maxLength="100" // Add max length
            />
          </div>

          {/* Description Textarea */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-200 mb-2">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows="5" // Increased rows for more space
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base placeholder-gray-400 resize-y"
              placeholder="Provide a detailed description of the issue, including specific location details or landmarks if possible."
              required
              maxLength="500" // Add max length
            ></textarea>
            <p className="mt-1 text-xs text-gray-400 text-right">{description.length}/500 characters</p>
          </div>

          {/* Report Anonymous Checkbox */}
          <div className="flex items-center pt-2">
            <input
              id="reportAnonymous"
              name="reportAnonymous"
              type="checkbox"
              checked={reportAnonymous}
              onChange={(e) => setReportAnonymous(e.target.checked)}
              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded bg-gray-700 cursor-pointer"
            />
            <label htmlFor="reportAnonymous" className="ml-3 block text-base text-gray-300 select-none">
              Report Anonymously
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
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