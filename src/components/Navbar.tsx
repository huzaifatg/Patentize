/* eslint-disable prettier/prettier */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  onConnectWallet: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout, onConnectWallet }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Check if the current path is dashboard (either /dashboard or /)
  const isDashboardActive = currentPath === '/dashboard' || (currentPath === '/' && isLoggedIn);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white p-4 flex justify-between items-center shadow-lg z-50 h-18">
      <div className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200">
          Patentize
      </div>

      <div className="flex space-x-4 ml-auto">
        {isLoggedIn ? (
          <>
            <Link
              to="/dashboard"
              className={`px-4 py-2 ${isDashboardActive ? 'bg-indigo-800' : 'hover:bg-indigo-800'} rounded transition`}
            >
              Dashboard
            </Link>
            <Link
              to="/my-assets"
              className={`px-4 py-2 ${currentPath === '/my-assets' ? 'bg-indigo-800' : 'hover:bg-indigo-800'} rounded transition`}
            >
              My Assets
            </Link>
            <Link
              to="/marketplace"
              className={`px-4 py-2 ${currentPath === '/marketplace' ? 'bg-indigo-800' : 'hover:bg-indigo-800'} rounded transition`}
            >
              Marketplace
            </Link>
            <Link
              to="/profile"
              className={`px-4 py-2 ${currentPath === '/profile' ? 'bg-indigo-800' : 'hover:bg-indigo-800'} rounded transition`}
            >
              Profile
            </Link>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition ml-4"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={onConnectWallet}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
