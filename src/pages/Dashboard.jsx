import React from 'react';
import QuickActions from '../components/dashboard/QuickActions';
import RecentActivity from '../components/dashboard/RecentActivity';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

const Dashboard = () => {
  // Sales Overview Data
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales 2025',
        data: [12000, 19000, 15000, 25000, 22000, 30000],
        borderColor: '#3B82F6',
        tension: 0.4,
      },
    ],
  };

  // Revenue by Category
  const categoryData = {
    labels: ['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          '#3B82F6',
          '#10B981',
          '#F59E0B',
          '#EC4899',
          '#6366F1',
        ],
      },
    ],
  };

  // Monthly Orders
  const ordersData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Orders',
        data: [450, 590, 510, 660, 710, 820],
        backgroundColor: '#10B981',
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm">Total Sales</h3>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">₹1,25,000</span>
            <span className="text-green-500 text-sm">+15%</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm">Total Orders</h3>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">856</span>
            <span className="text-green-500 text-sm">+8%</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm">Average Order Value</h3>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">₹2,890</span>
            <span className="text-red-500 text-sm">-2%</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm">Total Customers</h3>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">1,245</span>
            <span className="text-green-500 text-sm">+12%</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <QuickActions />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
          <Line data={salesData} options={{ responsive: true }} />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Revenue by Category</h2>
          <Doughnut data={categoryData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Recent Activity and Orders Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Monthly Orders</h2>
          <Bar data={ordersData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Top Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Top Selling Products</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sold</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                {
                  name: 'iPhone 13 Pro',
                  category: 'Electronics',
                  price: '₹89,999',
                  sold: 145,
                  revenue: '₹1,30,49,855',
                },
                {
                  name: 'Samsung 4K TV',
                  category: 'Electronics',
                  price: '₹45,999',
                  sold: 98,
                  revenue: '₹45,07,902',
                },
                {
                  name: 'Nike Air Max',
                  category: 'Fashion',
                  price: '₹12,999',
                  sold: 240,
                  revenue: '₹31,19,760',
                },
                {
                  name: 'Apple Watch',
                  category: 'Electronics',
                  price: '₹35,999',
                  sold: 156,
                  revenue: '₹56,15,844',
                },
                {
                  name: 'Sony Headphones',
                  category: 'Electronics',
                  price: '₹24,999',
                  sold: 189,
                  revenue: '₹47,24,811',
                },
              ].map((product, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sold}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
