import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStore,
  faUser,
  faBell,
  faShieldAlt,
  faEnvelope,
  faCreditCard,
  faPalette,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('store');

  const tabs = [
    { id: 'store', label: 'Store Settings', icon: faStore },
    { id: 'profile', label: 'Profile', icon: faUser },
    { id: 'notifications', label: 'Notifications', icon: faBell },
    { id: 'security', label: 'Security', icon: faShieldAlt },
    { id: 'email', label: 'Email', icon: faEnvelope },
    { id: 'payment', label: 'Payment', icon: faCreditCard },
    { id: 'appearance', label: 'Appearance', icon: faPalette },
    { id: 'localization', label: 'Localization', icon: faGlobe },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-12 md:col-span-3">
          <div className="card">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FontAwesomeIcon icon={tab.icon} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="col-span-12 md:col-span-9">
          <div className="card">
            {activeTab === 'store' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">Store Settings</h2>
                <div className="space-y-4">
                  <div className="form-group">
                    <label className="form-label">Store Name</label>
                    <input type="text" className="input-field" defaultValue="LuxeCart" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Store URL</label>
                    <input
                      type="text"
                      className="input-field"
                      defaultValue="https://luxecart.com"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Store Description</label>
                    <textarea
                      className="input-field"
                      rows="4"
                      defaultValue="Premium E-commerce Store"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Contact Email</label>
                    <input
                      type="email"
                      className="input-field"
                      defaultValue="contact@luxecart.com"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">Profile Settings</h2>
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    <img
                      src="https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff"
                      alt="Profile"
                      className="w-24 h-24 rounded-full"
                    />
                  </div>
                  <div>
                    <button className="btn-secondary">Change Avatar</button>
                    <p className="mt-2 text-sm text-gray-500">
                      JPG, GIF or PNG. Max size of 800K
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">First Name</label>
                      <input type="text" className="input-field" defaultValue="John" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Last Name</label>
                      <input type="text" className="input-field" defaultValue="Doe" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="input-field"
                      defaultValue="john@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Bio</label>
                    <textarea
                      className="input-field"
                      rows="4"
                      defaultValue="Store administrator and manager"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">Security Settings</h2>
                <div className="space-y-4">
                  <div className="form-group">
                    <label className="form-label">Current Password</label>
                    <input type="password" className="input-field" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">New Password</label>
                    <input type="password" className="input-field" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Confirm New Password</label>
                    <input type="password" className="input-field" />
                  </div>
                  <div className="form-group">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="form-checkbox" />
                      <span className="text-sm text-gray-700">
                        Enable two-factor authentication
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end mt-6 pt-6 border-t border-gray-200">
              <div className="flex space-x-3">
                <button className="btn-secondary">Cancel</button>
                <button className="btn-primary">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
