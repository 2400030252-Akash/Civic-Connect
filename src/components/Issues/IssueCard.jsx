import React from 'react';
import { 
  MessageSquare, 
  ThumbsUp, 
  Clock, 
  MapPin, 
  User,
  AlertCircle,
  CheckCircle,
  PlayCircle,
  Eye
} from 'lucide-react';

const IssueCard = ({ issue, onClick, viewMode = 'grid' }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'submitted': return Clock;
      case 'under_review': return Eye;
      case 'in_progress': return PlayCircle;
      case 'resolved': return CheckCircle;
      case 'closed': return CheckCircle;
      default: return Clock;
    }
  };

  const StatusIcon = getStatusIcon(issue.status);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (viewMode === 'list') {
    return (
      <div 
        onClick={onClick}
        className="card p-6 hover:shadow-md transition-all duration-200 cursor-pointer group"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                {issue.title}
              </h3>
              <div className="flex items-center space-x-2 ml-4 flex-shrink-0">
                <span className={`status-badge status-${issue.status}`}>
                  <StatusIcon size={12} className="mr-1" />
                  {issue.status.replace('_', ' ')}
                </span>
                <span className={`text-xs font-medium uppercase priority-${issue.priority}`}>
                  {issue.priority}
                </span>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {issue.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <span className="flex items-center">
                  <User size={14} className="mr-1" />
                  {issue.citizenName}
                </span>
                <span className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  {formatTimeAgo(issue.createdAt)}
                </span>
                {issue.location && (
                  <span className="flex items-center">
                    <MapPin size={14} className="mr-1" />
                    {issue.location}
                  </span>
                )}
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {issue.category}
                </span>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <ThumbsUp size={14} className="mr-1" />
                  {issue.upvotes}
                </span>
                <span className="flex items-center">
                  <MessageSquare size={14} className="mr-1" />
                  {issue.responses.length}
                </span>
                {issue.assignedPolitician && (
                  <span className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded">
                    Assigned
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className="card p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-2">
            {issue.title}
          </h3>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <User size={14} className="mr-1" />
              {issue.citizenName}
            </span>
            <span className="flex items-center">
              <Clock size={14} className="mr-1" />
              {formatTimeAgo(issue.createdAt)}
            </span>
            {issue.location && (
              <span className="flex items-center">
                <MapPin size={14} className="mr-1" />
                {issue.location}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2 ml-4">
          <span className={`status-badge status-${issue.status}`}>
            <StatusIcon size={12} className="mr-1" />
            {issue.status.replace('_', ' ')}
          </span>
          <span className={`text-xs font-medium uppercase priority-${issue.priority}`}>
            {issue.priority}
          </span>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {issue.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {issue.category}
          </span>
          <span className="flex items-center text-sm text-gray-500">
            <ThumbsUp size={14} className="mr-1" />
            {issue.upvotes}
          </span>
          <span className="flex items-center text-sm text-gray-500">
            <MessageSquare size={14} className="mr-1" />
            {issue.responses.length}
          </span>
        </div>
        {issue.assignedPolitician && (
          <span className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded">
            Assigned
          </span>
        )}
      </div>

      {issue.tags && issue.tags.length > 0 && (
        <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-gray-100">
          {issue.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-primary-50 text-primary-700">
              #{tag}
            </span>
          ))}
          {issue.tags.length > 3 && (
            <span className="text-xs text-gray-500">+{issue.tags.length - 3} more</span>
          )}
        </div>
      )}
    </div>
  );
};

export default IssueCard;