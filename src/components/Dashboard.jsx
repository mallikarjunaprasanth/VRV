import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Dashboard() {
  const user = useSelector(state => state.auth.user);
  const currentUserData = user;
  // Update isAdmin check
  const isAdmin = currentUserData?.user.role?.toLowerCase() === 'admin';

  const cards = [
    {
      title: 'User Management',
      description: 'Manage system users and their roles',
      link: '/users',
      permission: 'all',
      icon: '👥'
    },
    {
      title: 'Role Management',
      description: 'Configure roles and permissions',
      link: '/roles',
      permission: 'all',
      icon: '🔑'
    },
    {
      title: 'Content Management',
      description: 'Manage and edit content',
      link: '/content',
      permission: 'editor',
      icon: '📝'
    },
    {
      title: 'Analytics',
      description: 'View system analytics and reports',
      link: '/analytics',
      permission: 'viewer',
      icon: '📊'
    },
    {
      title: 'Settings',
      description: 'Configure system settings',
      link: '/settings',
      permission: 'all',
      icon: '⚙️'
    },
    {
      title: 'Reports',
      description: 'Generate and view reports',
      link: '/reports',
      permission: 'viewer',
      icon: '📈'
    }
  ];

  const hasPermission = (requiredPermission) => {
    if (!currentUserData) return false;
    if (isAdmin) return true;
    return currentUserData?.user?.permission.includes('all') || 
           currentUserData?.user?.permission.includes(requiredPermission.toLowerCase());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Enhanced Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to VRV Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your resources and access all features from one place
          </p>
        </div>

        {/* Enhanced Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            hasPermission(card.permission) && (
              <Link
                key={index}
                to={card.link}
                className="group block p-8 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors duration-200">
                    <span className="text-2xl">{card.icon}</span>
                  </div>
                  <h5 className="text-xl font-bold tracking-tight text-gray-900 ml-4">
                    {card.title}
                  </h5>
                </div>
                <p className="text-gray-600 mb-4 min-h-[3rem]">
                  {card.description}
                </p>
                <div className="flex items-center text-indigo-600 group-hover:text-indigo-700">
                  <span className="text-sm font-semibold">Access Now</span>
                  <svg 
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            )
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;