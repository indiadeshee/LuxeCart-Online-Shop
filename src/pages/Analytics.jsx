import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faDownload,
  faChartLine,
  faUsers,
  faShoppingCart,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [dateRange, setDateRange] = useState('7d');

  const revenueData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Revenue',
        data: [2100, 2400, 2200, 2600, 2800, 3200, 3100],
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const conversionData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Conversion Rate',
        data: [2.1, 2.4, 2.2, 2.6, 2.8, 3.2, 3.1],
        backgroundColor: '#8b5cf6',
      },
    ],
  };

  const customerSegmentData = {
    labels: ['New', 'Returning', 'Loyal', 'VIP'],
    datasets: [
      {
        data: [30, 25, 25, 20],
        backgroundColor: ['#0ea5e9', '#f97316', '#8b5cf6', '#22c55e'],
      },
    ],
  };

  const metrics = [
    {
      title: 'Revenue',
      value: '$32,621',
      change: '+12.5%',
      icon: faDollarSign,
      color: 'text-blue-600',
    },
    {
      title: 'Orders',
      value: '856',
      change: '+8.2%',
      icon: faShoppingCart,
      color: 'text-purple-600',
    },
    {
      title: 'Customers',
      value: '2,456',
      change: '+5.3%',
      icon: faUsers,
      color: 'text-orange-600',
    },
    {
      title: 'Conversion Rate',
      value: '2.8%',
      change: '+1.2%',
      icon: faChartLine,
      color: 'text-green-600',
    },
  ];

  const topProducts = [
    { name: 'Wireless Earbuds', sales: 245, revenue: '$12,250' },
    { name: 'Smart Watch', sales: 190, revenue: '$9,500' },
    { name: 'Laptop Sleeve', sales: 155, revenue: '$3,875' },
    { name: 'Bluetooth Speaker', sales: 142, revenue: '$7,100' },
    { name: 'Phone Case', sales: 138, revenue: '$2,070' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h1>
        <div className="flex space-x-3">
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="input-field pr-10"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="12m">Last 12 months</option>
            </select>
            <FontAwesomeIcon
              icon={faCalendar}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
          <button className="btn-secondary">
            <FontAwesomeIcon icon={faDownload} className="mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{metric.title}</p>
                <div className="flex items-center mt-2">
                  <h3 className="text-2xl font-semibold">{metric.value}</h3>
                  <span className="ml-2 text-sm text-green-600">{metric.change}</span>
                </div>
              </div>
              <FontAwesomeIcon icon={metric.icon} className={`text-2xl ${metric.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
          <Line data={revenueData} options={{ responsive: true }} />
        </div>
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Conversion Rate</h2>
          <Bar data={conversionData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Customer Segments & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Customer Segments</h2>
          <div className="flex justify-center">
            <div className="w-72">
              <Pie data={customerSegmentData} options={{ responsive: true }} />
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Top Products</h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.sales} sales</p>
                </div>
                <p className="font-medium text-blue-600">{product.revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
