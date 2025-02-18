import React from 'react';

const RecentActivity = () => {
  const activities = [
    {
      type: 'order',
      title: 'New Order #1234',
      description: 'John Doe placed an order for ₹2,500',
      time: '5 minutes ago',
      status: 'success',
    },
    {
      type: 'product',
      title: 'Low Stock Alert',
      description: 'iPhone 13 Pro is running low on stock (5 remaining)',
      time: '10 minutes ago',
      status: 'warning',
    },
    {
      type: 'customer',
      title: 'New Customer',
      description: 'Sarah Smith created an account',
      time: '15 minutes ago',
      status: 'info',
    },
    {
      type: 'review',
      title: 'New Review',
      description: '5-star review received for Samsung TV',
      time: '30 minutes ago',
      status: 'success',
    },
    {
      type: 'refund',
      title: 'Refund Request',
      description: 'Refund requested for Order #1230',
      time: '1 hour ago',
      status: 'danger',
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      danger: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors duration-150"
          >
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{activity.title}</h3>
              <p className="text-sm text-gray-500">{activity.description}</p>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
              {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
        View All Activity →
      </button>
    </div>
  );
};

export default RecentActivity;
