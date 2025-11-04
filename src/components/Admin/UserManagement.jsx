import React from 'react';
import { Users, UserPlus, Shield, Settings } from 'lucide-react';

const UserManagement = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600 mt-1">Manage users, roles, and permissions</p>
      </div>

      {/* Coming Soon */}
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center space-x-4 mb-6">
            <div className="p-4 bg-primary-100 rounded-full">
              <Users size={32} className="text-primary-600" />
            </div>
            <div className="p-4 bg-green-100 rounded-full">
              <UserPlus size={32} className="text-green-600" />
            </div>
            <div className="p-4 bg-purple-100 rounded-full">
              <Shield size={32} className="text-purple-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            User Management Dashboard Coming Soon
          </h2>
          <p className="text-gray-600 mb-8">
            Comprehensive user management tools for administrators to manage platform users, 
            assign roles, and configure permissions.
          </p>
          
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 text-left">
            <h3 className="font-semibold text-primary-900 mb-3">Upcoming Features:</h3>
            <ul className="text-sm text-primary-800 space-y-2">
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                User registration approval system
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Role-based access control management
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                User activity monitoring and analytics
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Bulk user operations and data export
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Advanced user search and filtering
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;