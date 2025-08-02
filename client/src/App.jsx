import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserHomePage from './pages/UserHomePage'
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import DetailPage from './pages/DetailPage';
import ReportIssuePage from './pages/ReportIssuePage';
import SearchResultsPage from './pages/SearchResultsPage'; // If separate page

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/user-home" element={<UserHomePage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/detail/:id" element={<DetailPage />} /> {/* Example for dynamic ID */}
      <Route path="/report-issue" element={<ReportIssuePage />} />
      <Route path="/search" element={<SearchResultsPage />} />
      {/* Add more routes as per your application's flow */}
    </Routes>
  );
}

export default App;