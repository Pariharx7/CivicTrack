// src/pages/RegistrationPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Added for confirmation

  const handleRegister = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Basic validation
    if (!userName || !email || !phone || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }
    // You'd add more robust validation here (e.g., email format, phone number format)

    console.log('Registering user:', { userName, email, phone, password });

    // In a real application, you would send this data to your backend API for registration.
    // Example:
    /*
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName, email, phone, password }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Registration successful!');
        navigate('/login'); // Redirect to login page after successful registration
      } else {
        alert('Registration failed: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Error during registration:', error);
      alert('An error occurred during registration.');
    });
    */

    // For now, simulate success and redirect to login
    alert('Registration successful! Please log in.');
    navigate('/login');
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

      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md mt-20"> {/* Added mt-20 to push content down from fixed header */}
        <h2 className="text-2xl font-bold text-center text-white mb-6">User Registration</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-300">User Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your user name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Phone</label>
            <input
              type="tel" // Use type="tel" for phone numbers
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your phone number"
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
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Confirm your password"
              required
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 ease-in-out"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-gray-300">
          Already have an account? {' '}
          <Link to="/login" className="font-medium text-blue-400 hover:text-blue-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;