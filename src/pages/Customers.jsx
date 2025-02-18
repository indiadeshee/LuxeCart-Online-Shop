import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faFilter,
  faEye,
  faEnvelope,
  faPhone,
  faShoppingCart,
  faDollarSign,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';

const Customers = () => {
  const [selectedSegment, setSelectedSegment] = useState('all');

  const customers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234-567-8900',
      joinDate: '2024-08-15',
      segment: 'vip',
      totalOrders: 45,
      totalSpent: '$4,521',
      lastOrder: '2025-02-10',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 234-567-8901',
      joinDate: '2024-09-20',
      segment: 'loyal',
      totalOrders: 32,
      totalSpent: '$3,245',
      lastOrder: '2025-02-12',
      avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=BC0D8A&color=fff',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1 234-567-8902',
      joinDate: '2024-11-05',
      segment: 'returning',
      totalOrders: 18,
      totalSpent: '$1,890',
      lastOrder: '2025-02-14',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=8ABC0D&color=fff',
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      phone: '+1 234-567-8903',
      joinDate: '2025-01-10',
      segment: 'new',
      totalOrders: 3,
      totalSpent: '$350',
      lastOrder: '2025-02-15',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=0DABC8&color=fff',
    },
  ];

  const getSegmentBadgeClass = (segment) => {
    switch (segment) {
      case 'vip':
        return 'bg-purple-100 text-purple-800';
      case 'loyal':
        return 'bg-blue-100 text-blue-800';
      case 'returning':
        return 'bg-green-100 text-green-800';
      case 'new':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCustomers = customers.filter(
    (customer) => selectedSegment === 'all' || customer.segment === selectedSegment
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
        <div className="flex space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search customers..."
              className="input-field pl-10"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
          <button className="btn-secondary">
            <FontAwesomeIcon icon={faFilter} className="mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Segment Filters */}
      <div className="flex space-x-2">
        {['all', 'vip', 'loyal', 'returning', 'new'].map((segment) => (
          <button
            key={segment}
            onClick={() => setSelectedSegment(segment)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
              selectedSegment === segment
                ? 'bg-primary-100 text-primary-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {segment}
          </button>
        ))}
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="card">
            <div className="flex items-start space-x-4">
              <img
                src={customer.avatar}
                alt={customer.name}
                className="w-16 h-16 rounded-full"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{customer.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
                      <span>{customer.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <FontAwesomeIcon icon={faPhone} className="text-gray-400" />
                      <span>{customer.phone}</span>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getSegmentBadgeClass(
                      customer.segment
                    )}`}
                  >
                    {customer.segment}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
                  <div>
                    <div className="flex items-center space-x-2 text-sm">
                      <FontAwesomeIcon
                        icon={faShoppingCart}
                        className="text-gray-400"
                      />
                      <span className="text-gray-600">Total Orders</span>
                    </div>
                    <p className="font-medium">{customer.totalOrders}</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 text-sm">
                      <FontAwesomeIcon
                        icon={faDollarSign}
                        className="text-gray-400"
                      />
                      <span className="text-gray-600">Total Spent</span>
                    </div>
                    <p className="font-medium">{customer.totalSpent}</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 text-sm">
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        className="text-gray-400"
                      />
                      <span className="text-gray-600">Join Date</span>
                    </div>
                    <p className="font-medium">{customer.joinDate}</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 text-sm">
                      <FontAwesomeIcon
                        icon={faShoppingCart}
                        className="text-gray-400"
                      />
                      <span className="text-gray-600">Last Order</span>
                    </div>
                    <p className="font-medium">{customer.lastOrder}</p>
                  </div>
                </div>

                <div className="mt-4 text-right">
                  <button className="btn-secondary">
                    <FontAwesomeIcon icon={faEye} className="mr-2" />
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
