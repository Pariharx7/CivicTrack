import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';  // axios for HTTP requests

const LoginPage = () => {
  const navigate = useNavigate();
  const [userNameOrEmail, setUserNameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userNameOrEmail || !password) {
      alert('Please enter your username/email and password.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      // Adjust the baseURL as per your backend address and CORS setup
      const res = await axios.post('http://localhost:3000/api/auth/login', {
        username: userNameOrEmail, // Your backend expects 'username' in body
        password,
      }, {
        withCredentials: true // if your backend sets HTTP-only cookies for JWT tokens
      });

      if (res.data.success) {
        // Login succeeded - user info is in res.data.data.user
        alert('Login successful!');
        // Optionally save user/token in state or context here
        // e.g., localStorage.setItem('user', JSON.stringify(res.data.data.user));

        // Redirect user to their home/dashboard page
        navigate('/user-home');
      } else {
        // Backend responded but login failed
        setErrorMsg(res.data.message || 'Login failed');
      }
    } catch (error) {
      // This handles network errors or unexpected responses
      if (error.response && error.response.data) {
        setErrorMsg(error.response.data.message || 'Login failed');
      } else {
        setErrorMsg('Network error: Please check your connection or backend server');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <header className="absolute top-0 left-0 right-0 bg-gray-900 text-white py-4 px-6 flex items-center justify-between shadow-md">
        <div className="text-xl font-semibold">CivicTrack</div>
        <nav>
          <Link to="/" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out">
            Home
          </Link>
        </nav>
      </header>

      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md mt-20">
        <h2 className="text-2xl font-bold text-center text-white mb-6">User Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">

          <div>
            <label htmlFor="userNameOrEmail" className="block text-sm font-medium text-gray-300">Username or Email</label>
            <input
              type="text"
              id="userNameOrEmail"
              name="userNameOrEmail"
              value={userNameOrEmail}
              onChange={(e) => setUserNameOrEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your username or email"
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

          {errorMsg && (
            <div className="text-red-400 text-sm text-center">{errorMsg}</div>
          )}

          <p className="mt-2 text-center text-sm">
            <Link to="/forgot-password" className="font-medium text-blue-400 hover:text-blue-300">
              Forgot password?
            </Link>
          </p>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Logging in...' : 'Login'}
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
