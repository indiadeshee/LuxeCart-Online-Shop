import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faFileImport,
  faFileExport,
  faSync,
  faTag,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

const QuickActions = () => {
  const actions = [
    {
      icon: faPlus,
      label: 'Add Product',
      color: 'bg-blue-500 hover:bg-blue-600',
      onClick: () => console.log('Add Product clicked'),
    },
    {
      icon: faFileImport,
      label: 'Import Data',
      color: 'bg-green-500 hover:bg-green-600',
      onClick: () => console.log('Import clicked'),
    },
    {
      icon: faFileExport,
      label: 'Export Report',
      color: 'bg-purple-500 hover:bg-purple-600',
      onClick: () => console.log('Export clicked'),
    },
    {
      icon: faSync,
      label: 'Sync Stock',
      color: 'bg-orange-500 hover:bg-orange-600',
      onClick: () => console.log('Sync clicked'),
    },
    {
      icon: faTag,
      label: 'Bulk Price',
      color: 'bg-pink-500 hover:bg-pink-600',
      onClick: () => console.log('Bulk Price clicked'),
    },
    {
      icon: faCog,
      label: 'Settings',
      color: 'bg-gray-500 hover:bg-gray-600',
      onClick: () => console.log('Settings clicked'),
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={action.onClick}
          className={`${action.color} text-white p-4 rounded-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50`}
        >
          <div className="flex flex-col items-center space-y-2">
            <FontAwesomeIcon icon={action.icon} className="text-2xl" />
            <span className="text-sm font-medium">{action.label}</span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
