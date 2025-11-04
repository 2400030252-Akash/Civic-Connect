import React, { useState } from 'react';
import { Vote, Clock, User, BarChart3, Calendar } from 'lucide-react';

const PollCard = ({ poll, onVote, hasVoted = false }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [showResults, setShowResults] = useState(hasVoted);

  const handleVote = () => {
    if (selectedOption && onVote) {
      onVote(poll.id, selectedOption);
      setShowResults(true);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPercentage = (votes) => {
    return poll.totalVotes > 0 ? Math.round((votes / poll.totalVotes) * 100) : 0;
  };

  const isExpired = new Date(poll.endDate) < new Date();
  const daysLeft = Math.ceil((new Date(poll.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="card p-6 hover:shadow-lg transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{poll.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{poll.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center">
              <User size={14} className="mr-1" />
              Created by Representative
            </span>
            <span className="flex items-center">
              <Calendar size={14} className="mr-1" />
              Ends {formatDate(poll.endDate)}
            </span>
            <span className="flex items-center">
              <Vote size={14} className="mr-1" />
              {poll.totalVotes} votes
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 ml-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            isExpired 
              ? 'bg-gray-100 text-gray-600' 
              : poll.isActive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
          }`}>
            {isExpired ? 'Ended' : poll.isActive ? 'Active' : 'Paused'}
          </span>
          {!isExpired && daysLeft > 0 && (
            <span className="text-xs text-gray-500">
              {daysLeft} day{daysLeft !== 1 ? 's' : ''} left
            </span>
          )}
        </div>
      </div>

      {/* Poll Options */}
      <div className="space-y-3 mb-6">
        {poll.options.map((option) => (
          <div key={option.id} className="relative">
            {showResults ? (
              // Results view
              <div className="border border-gray-200 rounded-lg p-4 relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-primary-100 transition-all duration-700 ease-out"
                  style={{ width: `${getPercentage(option.votes)}%` }}
                />
                <div className="relative flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{option.text}</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-gray-900">
                      {getPercentage(option.votes)}%
                    </span>
                    <div className="text-xs text-gray-500">{option.votes} votes</div>
                  </div>
                </div>
              </div>
            ) : (
              // Voting view
              <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedOption === option.id 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              } ${!poll.isActive || isExpired ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <input
                  type="radio"
                  name={`poll-${poll.id}`}
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
                  disabled={!poll.isActive || isExpired}
                />
                <span className="ml-3 text-sm font-medium text-gray-900">{option.text}</span>
              </label>
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowResults(!showResults)}
            className="inline-flex items-center text-sm text-primary-600 hover:text-primary-800 font-medium transition-colors"
          >
            <BarChart3 size={16} className="mr-1" />
            {showResults ? 'Hide Results' : 'View Results'}
          </button>
          
          {!showResults && !hasVoted && poll.isActive && !isExpired && (
            <button
              onClick={handleVote}
              disabled={!selectedOption}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Vote size={16} className="mr-2" />
              Cast Vote
            </button>
          )}
          
          {hasVoted && (
            <span className="inline-flex items-center text-sm text-green-600 font-medium">
              <Vote size={16} className="mr-1" />
              You voted
            </span>
          )}
        </div>
      </div>

      {/* Poll Category */}
      {poll.category && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {poll.category}
          </span>
        </div>
      )}
    </div>
  );
};

export default PollCard;