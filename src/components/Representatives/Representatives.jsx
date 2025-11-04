import React, { useState } from 'react';
import { Search, MapPin, Phone, Mail, ExternalLink, MessageSquare } from 'lucide-react';
import { mockRepresentatives } from '../../data/mockData';

const Representatives = () => {
  const [representatives] = useState(mockRepresentatives);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRepresentatives = representatives.filter(rep =>
    rep.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rep.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rep.party.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rep.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Representatives</h1>
        <p className="text-gray-600 mt-1">Connect with your elected officials and representatives</p>
      </div>

      {/* Search */}
      <div className="card p-6">
        <div className="relative max-w-md">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search representatives..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Representatives Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRepresentatives.map((representative) => (
          <div key={representative.id} className="card p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="h-16 w-16 bg-primary-500 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                {representative.name.split(' ').map(n => n[0]).join('')}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {representative.name}
                </h3>
                <p className="text-primary-600 font-medium mb-2">
                  {representative.position}
                </p>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-2 flex-shrink-0" />
                    <span>{representative.district}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3.5 h-3.5 mr-2 rounded-full bg-primary-500 flex-shrink-0"></span>
                    <span>{representative.party}</span>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {representative.bio}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <a
                    href={`mailto:${representative.email}`}
                    className="inline-flex items-center px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm hover:bg-primary-100 transition-colors"
                  >
                    <Mail size={14} className="mr-1" />
                    Email
                  </a>
                  
                  {representative.phone && (
                    <a
                      href={`tel:${representative.phone}`}
                      className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm hover:bg-green-100 transition-colors"
                    >
                      <Phone size={14} className="mr-1" />
                      Call
                    </a>
                  )}
                  
                  <button className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-colors">
                    <MessageSquare size={14} className="mr-1" />
                    Message
                  </button>
                </div>
                
                {representative.socialMedia && (
                  <div className="flex items-center space-x-3 text-sm">
                    {representative.socialMedia.twitter && (
                      <a
                        href={`https://twitter.com/${representative.socialMedia.twitter.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 flex items-center"
                      >
                        Twitter <ExternalLink size={12} className="ml-1" />
                      </a>
                    )}
                    {representative.socialMedia.facebook && (
                      <a
                        href={`https://facebook.com/${representative.socialMedia.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 flex items-center"
                      >
                        Facebook <ExternalLink size={12} className="ml-1" />
                      </a>
                    )}
                    {representative.socialMedia.linkedin && (
                      <a
                        href={`https://linkedin.com/in/${representative.socialMedia.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:text-blue-800 flex items-center"
                      >
                        LinkedIn <ExternalLink size={12} className="ml-1" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRepresentatives.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No representatives found</h3>
          <p className="text-gray-600">Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Representatives;