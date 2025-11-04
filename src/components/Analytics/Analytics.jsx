import React from 'react';
import { BarChart3, TrendingUp, PieChart, Activity } from 'lucide-react';

const Analytics = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-1">Insights and metrics for platform performance</p>
      </div>

      {/* Coming Soon */}
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center space-x-4 mb-6">
            <div className="p-4 bg-primary-100 rounded-full">
              <BarChart3 size={32} className="text-primary-600" />
            </div>
            <div className="p-4 bg-green-100 rounded-full">
              <TrendingUp size={32} className="text-green-600" />
            </div>
            <div className="p-4 bg-purple-100 rounded-full">
              <PieChart size={32} className="text-purple-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Advanced Analytics Coming Soon
          </h2>
          <p className="text-gray-600 mb-8">
            Comprehensive analytics dashboard with detailed insights into platform usage, 
            user engagement, and community interaction patterns.
          </p>
          
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 text-left">
            <h3 className="font-semibold text-primary-900 mb-3">Upcoming Features:</h3>
            <ul className="text-sm text-primary-800 space-y-2">
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Real-time user engagement metrics
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Issue resolution time tracking
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Community participation analytics
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Representative response rate analysis
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Custom reporting and data export
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;