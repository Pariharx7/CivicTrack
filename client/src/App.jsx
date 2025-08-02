import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserHomePage from './pages/UserHomePage'
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import IssueDetailPage from './pages/IssueDetailPage';
import ReportIssuePage from './pages/ReportIssuePage';
import MyIssuesPage from './pages/MyIssuesPage';
import IssuesListPage from './pages/IssuesListPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/user-home" element={<UserHomePage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/report-issue" element={<ReportIssuePage />} />
      <Route path="/search" element={<IssuesListPage />} />
      <Route path="/issue/:id" element={<IssueDetailPage />} /> {/* Example for dynamic ID */}
      <Route path="/my-issues" element={<MyIssuesPage />} />
      {/* <Route path="*" element={<NotFoundPage />} /> */}
      {/* Add more routes as per your application's flow */}
    </Routes>
  );
}

export default App;