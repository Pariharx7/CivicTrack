// src/components/DetailPageHeader.jsx
import React from 'react';
// Remove BsPlusSquare as it's no longer needed for a plus sign icon
// import { BsPlusSquare } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa'; // Import a generic user icon for profile fallback
import { useNavigate } from 'react-router-dom';

const DetailPageHeader = ({ onEdit, onDelete, onProfileClick, profileImageUrl }) => { // Added onProfileClick, profileImageUrl props
    const navigate = useNavigate();

    return (
        <header className="w-full bg-gray-900 text-white p-4 flex justify-between items-center shadow-none sticky top-0 z-20
                           border-t-2 border-b-2 border-gray-700">
            {/* Left: "CivicTrack" Text */}
            <span className="text-xl sm:text-2xl font-bold text-white tracking-wider">
                CivicTrack
            </span>

            {/* Right: "Edit", "Delete", and Profile Image/Link */}
            <div className="flex items-center space-x-4">
                {/* "Edit" Button */}
                <button
                    onClick={onEdit}
                    className="text-white hover:text-indigo-400 font-semibold text-lg transition duration-200 ease-in-out focus:outline-none"
                    aria-label="Edit"
                >
                    Edit
                </button>

                {/* "Delete" Button */}
                <button
                    onClick={onDelete}
                    className="text-white hover:text-red-400 font-semibold text-lg transition duration-200 ease-in-out focus:outline-none"
                    aria-label="Delete"
                >
                    Delete
                </button>

                {/* Profile Image/Icon Button */}
                {/* This button will trigger the onProfileClick prop to navigate to the profile page */}
                <button
                    onClick={onProfileClick}
                    className="rounded-full overflow-hidden w-9 h-9 flex items-center justify-center
                               border-2 border-gray-600 hover:border-indigo-400 transition duration-200 ease-in-out
                               focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="View Profile"
                >
                    {/* Conditionally render user's profile image or a generic user icon */}
                    {profileImageUrl ? (
                        <img
                            src={profileImageUrl}
                            alt="User Profile"
                            className="w-full h-full object-cover" // Ensure image covers the button area
                        />
                    ) : (
                        <FaUserCircle className="text-3xl text-gray-300" /> // Generic user icon as a fallback
                    )}
                </button>
            </div>
        </header>
    );
};

export default DetailPageHeader;