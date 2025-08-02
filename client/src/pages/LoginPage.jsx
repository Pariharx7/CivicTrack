// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState(''); 
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Basic validation
    if (!userName || !password) {
      alert('Please enter your username/email and password.');
      return;
    }

    console.log('Attempting login with:', { userName, password });

    // In a real application, you would send this data to your backend API for authentication.
    // Example:
    /*
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier: userNameOrEmail, password }), // Use 'identifier' for either username or email
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Login successful!');
        // Store user token/session (e.g., localStorage, context API)
        // navigate('/user-home'); // Redirect to user's home page
      } else {
        alert('Login failed: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Error during login:', error);
      alert('An error occurred during login.');
    });
    */

    // For now, simulate success and redirect to user home page
    alert('Login successful!');
    navigate('/user-home'); // Redirect to user's specific home page
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Header with CivicTrack and Home Button */}
      <header className="absolute top-0 left-0 right-0 bg-gray-900 text-white py-4 px-6 flex items-center justify-between shadow-md">
        <div className="text-xl font-semibold">CivicTrack</div>
        <nav>
          <Link to="/" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out">
            Home
          </Link>
        </nav>
      </header>

      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md mt-20"> {/* Added mt-20 for spacing */}
        <h2 className="text-2xl font-bold text-center text-white mb-6">User Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="userNameOrEmail" className="block text-sm font-medium text-gray-300">User Name / Email</label>
            <input
              type="text"
              id="userNameOrEmail"
              name="userNameOrEmail"
              value={userNameOrEmail}
              onChange={(e) => setUserNameOrEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your user name or email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
              required
            />
          </div>

          <p className="mt-2 text-center text-sm">
            <Link to="/forgot-password" className="font-medium text-blue-400 hover:text-blue-300">
              Forgot password?
            </Link>
          </p>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 ease-in-out"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-300">
          Don't have an account? {' '}
          <Link to="/register" className="font-medium text-blue-400 hover:text-blue-300">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;