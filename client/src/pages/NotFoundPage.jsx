// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// You might choose to include GlobalNav or a simpler header here,
// but for a 404 page, a minimal approach is often best.

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 sm:p-12 md:p-16 text-center border border-gray-700">
        <h1 className="text-6xl sm:text-8xl font-bold text-indigo-500 mb-4">404</h1>
        <h2 className="text-2xl sm:text-4xl font-semibold text-white mb-6">Page Not Found</h2>
        <p className="text-gray-300 text-lg mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;