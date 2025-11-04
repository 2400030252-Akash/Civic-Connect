import React, { useState } from 'react';
import { Plus, Search, Filter, Vote } from 'lucide-react';
import { mockPolls } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import PollCard from './PollCard';

const PollList = () => {
  const { user } = useAuth();
  const [polls, setPolls] = useState(mockPolls);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [votedPolls, setVotedPolls] = useState(new Set());

  const filteredPolls = polls.filter(poll => {
    const matchesSearch = poll.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         poll.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const now = new Date();
    const endDate = new Date(poll.endDate);
    const isExpired = endDate < now;
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'active' && poll.isActive && !isExpired) ||
                         (filter === 'ended' && isExpired);
    
    return matchesSearch && matchesFilter;
  });

  const handleVote = (pollId, optionId) => {
    setPolls(polls.map(poll => {
      if (poll.id === pollId) {
        return {
          ...poll,
          options: poll.options.map(option => ({
            ...option,
            votes: option.id === optionId ? option.votes + 1 : option.votes
          })),
          totalVotes: poll.totalVotes + 1
        };
      }
      return poll;
    }));
    
    setVotedPolls(prev => new Set([...prev, pollId]));
  };

  const canCreatePoll = user?.role === 'politician' || user?.role === 'admin';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Community Polls</h1>
          <p className="text-gray-600 mt-1">Participate in community decision-making</p>
        </div>
        {canCreatePoll && (
          <button className="btn-primary">
            <Plus size={20} className="mr-2" />
            Create Poll
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search polls..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Filter size={20} className="text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="input-field min-w-32"
            >
              <option value="all">All Polls</option>
              <option value="active">Active</option>
              <option value="ended">Ended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Showing {filteredPolls.length} of {polls.length} polls</span>
      </div>

      {/* Polls Grid */}
      {filteredPolls.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Vote size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No polls found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filter !== 'all' 
              ? 'Try adjusting your search criteria or filters.' 
              : 'No polls have been created yet.'
            }
          </p>
          {canCreatePoll && (
            <button className="btn-primary">
              <Plus size={20} className="mr-2" />
              Create First Poll
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPolls.map(poll => (
            <PollCard 
              key={poll.id} 
              poll={poll} 
              onVote={handleVote}
              hasVoted={votedPolls.has(poll.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PollList;