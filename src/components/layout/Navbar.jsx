import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faBell,
  faEnvelope,
  faSearch,
  faCog,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-600 focus:outline-none"
            >
              <FontAwesomeIcon icon={faBars} className="text-xl" />
            </button>

            <div className="hidden md:flex ml-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary-500"
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-500 hover:text-gray-600 focus:outline-none">
              <FontAwesomeIcon icon={faBell} className="text-xl" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <button className="relative p-2 text-gray-500 hover:text-gray-600 focus:outline-none">
              <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-blue-500"></span>
            </button>

            <div className="relative">
              <button className="flex items-center space-x-3 focus:outline-none">
                <img
                  src="https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <div className="hidden md:block text-left">
                  <h3 className="text-sm font-medium">John Doe</h3>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </button>

              <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 hidden">
                <a
                  href="#settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FontAwesomeIcon icon={faCog} className="mr-3" />
                  Settings
                </a>
                <a
                  href="#logout"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
