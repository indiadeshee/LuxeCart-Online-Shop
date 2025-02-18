import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faFilter,
  faEye,
  faTruck,
  faBan,
  faCheck,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';

const Orders = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');

  const orders = [
    {
      id: '#ORD-001',
      customer: 'John Doe',
      email: 'john@example.com',
      amount: '$299.99',
      date: '2025-02-16',
      status: 'delivered',
      items: [
        { name: 'Wireless Earbuds', quantity: 1, price: '$159.99' },
        { name: 'Phone Case', quantity: 2, price: '$69.99' },
      ],
    },
    {
      id: '#ORD-002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      amount: '$199.50',
      date: '2025-02-16',
      status: 'processing',
      items: [
        { name: 'Smart Watch', quantity: 1, price: '$199.50' },
      ],
    },
    {
      id: '#ORD-003',
      customer: 'Mike Johnson',
      email: 'mike@example.com',
      amount: '$549.99',
      date: '2025-02-15',
      status: 'shipped',
      items: [
        { name: 'Laptop Sleeve', quantity: 1, price: '$49.99' },
        { name: 'Bluetooth Speaker', quantity: 1, price: '$299.99' },
        { name: 'Wireless Mouse', quantity: 1, price: '$199.99' },
      ],
    },
    {
      id: '#ORD-004',
      customer: 'Sarah Wilson',
      email: 'sarah@example.com',
      amount: '$89.99',
      date: '2025-02-15',
      status: 'cancelled',
      items: [
        { name: 'Phone Charger', quantity: 1, price: '$89.99' },
      ],
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <FontAwesomeIcon icon={faCheck} className="text-green-600" />;
      case 'processing':
        return <FontAwesomeIcon icon={faSpinner} className="text-blue-600" />;
      case 'shipped':
        return <FontAwesomeIcon icon={faTruck} className="text-purple-600" />;
      case 'cancelled':
        return <FontAwesomeIcon icon={faBan} className="text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(
    (order) => selectedStatus === 'all' || order.status === selectedStatus
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
        <div className="flex space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
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

      {/* Status Filters */}
      <div className="flex space-x-2">
        {['all', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
              selectedStatus === status
                ? 'bg-primary-100 text-primary-800'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="font-medium">{order.id}</h3>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadgeClass(
                    order.status
                  )}`}
                >
                  {getStatusIcon(order.status)}
                  <span className="ml-2">{order.status}</span>
                </span>
              </div>
              <button className="btn-secondary">
                <FontAwesomeIcon icon={faEye} className="mr-2" />
                View Details
              </button>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Customer</p>
                  <p className="font-medium">{order.customer}</p>
                  <p className="text-sm text-gray-600">{order.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Order Items</p>
                  <div className="space-y-1">
                    {order.items.map((item, index) => (
                      <p key={index} className="text-sm">
                        {item.quantity}x {item.name} - {item.price}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-xl font-semibold text-primary-600">
                    {order.amount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
