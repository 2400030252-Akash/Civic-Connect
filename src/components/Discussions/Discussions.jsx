import React from 'react';
import { MessageSquare, Users, TrendingUp } from 'lucide-react';

const Discussions = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Community Discussions</h1>
        <p className="text-gray-600 mt-1">Engage in meaningful conversations with your community</p>
      </div>

      {/* Coming Soon */}
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center space-x-4 mb-6">
            <div className="p-4 bg-primary-100 rounded-full">
              <MessageSquare size={32} className="text-primary-600" />
            </div>
            <div className="p-4 bg-green-100 rounded-full">
              <Users size={32} className="text-green-600" />
            </div>
            <div className="p-4 bg-purple-100 rounded-full">
              <TrendingUp size={32} className="text-purple-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Community Discussions Coming Soon
          </h2>
          <p className="text-gray-600 mb-8">
            We're building a powerful discussion platform where citizens and representatives 
            can engage in meaningful conversations about community issues, policies, and initiatives.
          </p>
          
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 text-left">
            <h3 className="font-semibold text-primary-900 mb-3">Upcoming Features:</h3>
            <ul className="text-sm text-primary-800 space-y-2">
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Topic-based discussion threads
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Real-time messaging and notifications
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Moderated community forums
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Direct messaging with representatives
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                Community voting on discussion topics
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discussions;