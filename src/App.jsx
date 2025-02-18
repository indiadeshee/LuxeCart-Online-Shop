import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Analytics from './pages/Analytics';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Settings from './pages/Settings';
import Watermark from './components/common/Watermark';
import { sourceProtection } from './components/common/SourceProtection';
import { protection } from './utils/protection';

// Copyright Protection
const COPYRIGHT = {
  product: 'LuxeCart Premium E-commerce Dashboard',
  author: 'Raviranjan Kumar',
  brand: 'desheekart',
  year: new Date().getFullYear(),
  license: 'Single Use License - CodeCanyon',
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isProtected, setIsProtected] = useState(false);

  useEffect(() => {
    // Initialize protection
    sourceProtection.init();
    protection.init();
    setIsProtected(true);

    // Add protection notice
    console.log(`%c
    🛡️ LuxeCart Premium E-commerce Dashboard
    © ${new Date().getFullYear()} desheekart
    Developed by Raviranjan Kumar
    All Rights Reserved
    `, 'color: #0ea5e9; font-size: 12px; font-weight: bold;');

    // Verify protection periodically
    const interval = setInterval(() => {
      if (!protection.verify() || !window.__luxecart_protected) {
        console.warn('Protection violation detected');
        window.location.reload();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!isProtected) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="h-screen bg-gray-100">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div className={`flex flex-col ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'} transition-all duration-200`}>
          <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
          <Watermark />
          <div className="text-center text-xs text-gray-500 py-2">
            {COPYRIGHT.product} {COPYRIGHT.year} {COPYRIGHT.brand}
            <br />
            Developed by {COPYRIGHT.author} | {COPYRIGHT.license}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
