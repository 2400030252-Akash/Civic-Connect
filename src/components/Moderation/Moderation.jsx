import React from 'react';
import { Shield, Flag, Eye, AlertTriangle } from 'lucide-react';

const Moderation = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Moderation Dashboard</h1>
        <p className="text-gray-600 mt-1">Monitor and moderate community content and interactions</p>
      </div>

      {/* Coming Soon */}
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center space-x-4 mb-6">
            <div className="p-4 bg-primary-100 rounded-full">
              <Shield size={32} className="text-primary-600" />
            </div>
            <div className="p-4 bg-red-100 rounded-full">
              <Flag size={32} className="text-red-600" />
            </div>
            <div className="p-4 bg-yellow-100 rounded-full">
              <AlertTriangle size={32} className="text-yellow-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Moderation Tools Coming Soon
          </h2>
          <p className="text-gray-600 mb-8">
            Comprehensive moderation dashboard with tools to maintain community standards, 
            review reported content, and ensure respectful interactions.
          </p>
          
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 text-left">
            <h3 className="font-semibold text-primary-900 mb-3">Upcoming Features:</h3>
            <ul className="text-sm text-primary-800 space-y-2">
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Content review and approval queue
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Automated content filtering and flagging
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                User behavior monitoring and warnings
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Community guidelines enforcement
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Escalation and appeal management
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Moderation;