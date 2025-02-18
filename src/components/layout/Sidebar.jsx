import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBoxes,
  faChartLine,
  faShoppingCart,
  faUsers,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

const menuItems = [
  { path: '/', icon: faHome, label: 'Dashboard' },
  { path: '/inventory', icon: faBoxes, label: 'Inventory' },
  { path: '/analytics', icon: faChartLine, label: 'Analytics' },
  { path: '/orders', icon: faShoppingCart, label: 'Orders' },
  { path: '/customers', icon: faUsers, label: 'Customers' },
  { path: '/settings', icon: faCog, label: 'Settings' },
];

function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  return (
    <aside
      className={`sidebar ${
        !isOpen && 'sidebar-collapsed'
      } z-20`}
    >
      <div className="h-16 flex items-center justify-center">
        <img
          src="/logo.png"
          alt="LuxeCart"
          className={`h-8 transition-all duration-200 ${
            !isOpen ? 'w-8' : 'w-32'
          }`}
        />
      </div>

      <nav className="mt-8">
        <div className="px-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${
                location.pathname === item.path ? 'nav-link-active' : ''
              }`}
            >
              <FontAwesomeIcon
                icon={item.icon}
                className={`text-lg ${!isOpen ? 'mr-0' : 'mr-3'}`}
              />
              <span className={`${!isOpen ? 'hidden' : 'block'}`}>
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </nav>

      <div className="absolute bottom-0 w-full p-4">
        <div className={`flex items-center ${!isOpen ? 'justify-center' : 'space-x-4'}`}>
          <img
            src="/avatar.png"
            alt="User"
            className="h-8 w-8 rounded-full"
          />
          <div className={`${!isOpen ? 'hidden' : 'block'}`}>
            <h5 className="text-sm font-medium text-gray-700">John Doe</h5>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
