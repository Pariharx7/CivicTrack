// src/components/AppHeader.jsx
import React from 'react';

const AppHeader = ({ title = 'CivicTrack' }) => { // Default title to CivicTrack
  return (
    <header className="w-full bg-gray-900 text-white p-4 flex justify-between items-center shadow-lg sticky top-0 z-20
                       border-b-2 border-gray-700"> {/* Bottom border for separation */}
      <h1 className="text-2xl sm:text-3xl font-bold text-white">
        {title}
      </h1>
      {/* You can add navigation like "My Issues" or "Report New Issue" here if it's part of this header's design,
          but based on Screen 3, it's quite minimal at the very top. */}
      {/* For example, a User Profile button could go here or a "Report Issue" button.
          <button className="...">Report New Issue</button>
      */}
    </header>
  );
};

export default AppHeader;