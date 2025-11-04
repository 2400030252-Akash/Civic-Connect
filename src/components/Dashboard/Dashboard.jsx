import React from 'react';
import { 
  FileText, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Vote
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getInitial } from '../../utils/string';
import { useIssues } from '../../context/IssueContext';

const Dashboard = () => {
  const { user } = useAuth();
  const { issues } = useIssues();

  const getStatsForRole = () => {
    const userIssues = issues.filter(issue => issue.citizenId === user?.id);
    const resolvedIssues = issues.filter(issue => issue.status === 'resolved');
    const inProgressIssues = issues.filter(issue => issue.status === 'in_progress');
    const totalResponses = issues.reduce((sum, issue) => sum + issue.responses.length, 0);

    switch (user?.role) {
      case 'admin':
        return [
          { 
            title: 'Total Issues', 
            value: issues.length, 
            icon: FileText, 
            color: 'bg-blue-500', 
            change: '+12%', 
            changeType: 'increase',
            description: 'All platform issues'
          },
          { 
            title: 'Active Users', 
            value: 1248, 
            icon: Users, 
            color: 'bg-green-500', 
            change: '+8%', 
            changeType: 'increase',
            description: 'Monthly active users'
          },
          { 
            title: 'Resolved Issues', 
            value: resolvedIssues.length, 
            icon: CheckCircle, 
            color: 'bg-emerald-500', 
            change: '+15%', 
            changeType: 'increase',
            description: 'Successfully resolved'
          },
          { 
            title: 'Response Rate', 
            value: '94%', 
            icon: TrendingUp, 
            color: 'bg-purple-500', 
            change: '+3%', 
            changeType: 'increase',
            description: 'Average response rate'
          },
        ];
      case 'politician':
        const assignedIssues = issues.filter(issue => issue.assignedPolitician === user?.id);
        return [
          { 
            title: 'Assigned Issues', 
            value: assignedIssues.length, 
            icon: FileText, 
            color: 'bg-blue-500', 
            change: '+5', 
            changeType: 'increase',
            description: 'Issues assigned to you'
          },
          { 
            title: 'Constituents', 
            value: 1842, 
            icon: Users, 
            color: 'bg-green-500', 
            change: '+12', 
            changeType: 'increase',
            description: 'Your district residents'
          },
          { 
            title: 'Responses Given', 
            value: 67, 
            icon: MessageSquare, 
            color: 'bg-indigo-500', 
            change: '+9', 
            changeType: 'increase',
            description: 'Your responses this month'
          },
          { 
            title: 'Satisfaction Rate', 
            value: '92%', 
            icon: TrendingUp, 
            color: 'bg-purple-500', 
            change: '+2%', 
            changeType: 'increase',
            description: 'Constituent satisfaction'
          },
        ];
      case 'moderator':
        return [
          { 
            title: 'Pending Reviews', 
            value: 12, 
            icon: Clock, 
            color: 'bg-yellow-500', 
            change: '-3', 
            changeType: 'decrease',
            description: 'Items awaiting review'
          },
          { 
            title: 'Moderated Today', 
            value: 34, 
            icon: CheckCircle, 
            color: 'bg-green-500', 
            change: '+8', 
            changeType: 'increase',
            description: 'Actions taken today'
          },
          { 
            title: 'Reports', 
            value: 7, 
            icon: AlertCircle, 
            color: 'bg-red-500', 
            change: '0', 
            changeType: 'neutral',
            description: 'Active reports'
          },
          { 
            title: 'Response Time', 
            value: '2.3h', 
            icon: Clock, 
            color: 'bg-blue-500', 
            change: '-0.5h', 
            changeType: 'increase',
            description: 'Average response time'
          },
        ];
      default: // citizen
        return [
          { 
            title: 'My Issues', 
            value: userIssues.length, 
            icon: FileText, 
            color: 'bg-blue-500', 
            change: '+1', 
            changeType: 'increase',
            description: 'Issues you\'ve reported'
          },
          { 
            title: 'Responses', 
            value: userIssues.reduce((sum, issue) => sum + issue.responses.length, 0), 
            icon: MessageSquare, 
            color: 'bg-green-500', 
            change: '+2', 
            changeType: 'increase',
            description: 'Responses to your issues'
          },
          { 
            title: 'Resolved', 
            value: userIssues.filter(issue => issue.status === 'resolved').length, 
            icon: CheckCircle, 
            color: 'bg-emerald-500', 
            change: '+1', 
            changeType: 'increase',
            description: 'Your resolved issues'
          },
          { 
            title: 'In Progress', 
            value: userIssues.filter(issue => issue.status === 'in_progress').length, 
            icon: Clock, 
            color: 'bg-yellow-500', 
            change: '0', 
            changeType: 'neutral',
            description: 'Issues being worked on'
          },
        ];
    }
  };

  const stats = getStatsForRole();

  const getRecentActivity = () => {
    const activities = [
      { id: 1, action: 'New issue submitted', user: 'John Citizen', time: '5 minutes ago', type: 'issue', color: 'text-blue-500' },
      { id: 2, action: 'Issue resolved', user: 'Hon. Sarah Johnson', time: '1 hour ago', type: 'resolution', color: 'text-green-500' },
      { id: 3, action: 'Response posted', user: 'Hon. Sarah Johnson', time: '2 hours ago', type: 'response', color: 'text-indigo-500' },
      { id: 4, action: 'New user registered', user: 'Jane Smith', time: '3 hours ago', type: 'user', color: 'text-purple-500' },
      { id: 5, action: 'Issue updated', user: 'Mike Moderator', time: '4 hours ago', type: 'update', color: 'text-yellow-500' },
    ];

    return activities;
  };

  const recentActivity = getRecentActivity();

  const getActivityIcon = (type) => {
    switch (type) {
      case 'issue': return FileText;
      case 'resolution': return CheckCircle;
      case 'response': return MessageSquare;
      case 'user': return Users;
      case 'update': return Clock;
      default: return FileText;
    }
  };

  const getRoleDescription = () => {
    switch (user?.role) {
      case 'admin': return "Monitor platform activity and manage the community.";
      case 'citizen': return "Track your issues and connect with your representatives.";
      case 'politician': return "Engage with your constituents and address their concerns.";
      case 'moderator': return "Maintain community standards and facilitate discussions.";
      default: return "Welcome to CiviConnect!";
    }
  };

  const getChangeIcon = (changeType) => {
    switch (changeType) {
      case 'increase': return ArrowUpRight;
      case 'decrease': return ArrowDownRight;
      default: return Minus;
    }
  };

  const getChangeColor = (changeType) => {
    switch (changeType) {
      case 'increase': return 'text-green-600';
      case 'decrease': return 'text-red-600';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-indigo-600 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-primary-100 text-lg">
              {getRoleDescription()}
            </p>
            {user?.district && (
              <p className="text-primary-200 text-sm mt-1">
                Serving {user.district}
              </p>
            )}
          </div>
          <div className="hidden md:block">
            <div className="h-20 w-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold">
                {getInitial(user?.name)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const ChangeIcon = getChangeIcon(stat.changeType);
          return (
            <div key={index} className="card p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                </div>
                {stat.change && (
                  <div className={`flex items-center space-x-1 ${getChangeColor(stat.changeType)}`}>
                    <ChangeIcon size={16} />
                    <span className="text-sm font-medium">{stat.change}</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-3">{stat.description}</p>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <BarChart3 size={20} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = getActivityIcon(activity.type);
              return (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`mt-0.5 ${activity.color}`}>
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-500">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button className="text-sm text-primary-600 hover:text-primary-800 font-medium transition-colors">
              View all activity →
            </button>
          </div>
        </div>

        {/* Recent Issues */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {user?.role === 'citizen' ? 'My Recent Issues' : 'Latest Issues'}
          </h3>
          <div className="space-y-4">
            {issues.slice(0, 4).map((issue) => (
              <div key={issue.id} className="border-l-4 border-primary-500 pl-4 py-2 hover:bg-gray-50 rounded-r-lg transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                      {issue.title}
                    </h4>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>{issue.category}</span>
                      <span>•</span>
                      <span>{issue.upvotes} votes</span>
                      <span>•</span>
                      <span>{issue.responses.length} responses</span>
                    </div>
                  </div>
                  <span className={`
                    inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-3 flex-shrink-0
                    ${issue.status === 'resolved' ? 'bg-green-100 text-green-800' : 
                      issue.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' : 
                      issue.status === 'under_review' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'}
                  `}>
                    {issue.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200">
            <button className="text-sm text-primary-600 hover:text-primary-800 font-medium transition-colors">
              View all issues →
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {user?.role === 'citizen' && (
            <button className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 text-left">
              <FileText size={24} className="text-primary-600 mb-2" />
              <h4 className="font-medium text-gray-900">Report New Issue</h4>
              <p className="text-sm text-gray-500">Submit a new community issue</p>
            </button>
          )}
          
          <button className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 text-left">
            <MessageSquare size={24} className="text-primary-600 mb-2" />
            <h4 className="font-medium text-gray-900">Join Discussion</h4>
            <p className="text-sm text-gray-500">Participate in community talks</p>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 text-left">
            <Vote size={24} className="text-primary-600 mb-2" />
            <h4 className="font-medium text-gray-900">Vote on Polls</h4>
            <p className="text-sm text-gray-500">Make your voice heard</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;