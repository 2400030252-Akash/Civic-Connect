import React, { useState, useMemo } from 'react';
import { Search, Filter, Plus, Grid2x2 as Grid, List, SlidersHorizontal } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useIssues } from '../../context/IssueContext';
import { categories } from '../../data/mockData';
import IssueCard from './IssueCard';
import IssueDetail from './IssueDetail';
import CreateIssue from './CreateIssue';

const IssueList = ({ showMyIssues = false }) => {
  const { user } = useAuth();
  const { issues } = useIssues();
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showCreateIssue, setShowCreateIssue] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('latest');

  const filteredAndSortedIssues = useMemo(() => {
    let filtered = issues.filter(issue => {
      // Filter by user if showing "My Issues"
      if (showMyIssues && issue.citizenId !== user?.id) {
        return false;
      }

      // Search filter
      const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           issue.citizenName.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategory = selectedCategory === '' || issue.category === selectedCategory;
      
      // Status filter
      const matchesStatus = selectedStatus === '' || issue.status === selectedStatus;
      
      // Priority filter
      const matchesPriority = selectedPriority === '' || issue.priority === selectedPriority;
      
      return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
    });

    // Sort issues
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'upvotes':
          return b.upvotes - a.upvotes;
        case 'responses':
          return b.responses.length - a.responses.length;
        case 'latest':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return filtered;
  }, [issues, showMyIssues, user?.id, searchTerm, selectedCategory, selectedStatus, selectedPriority, sortBy]);

  const selectedIssueData = selectedIssue ? issues.find(i => i.id === selectedIssue) : null;

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedStatus('');
    setSelectedPriority('');
  };

  const hasActiveFilters = searchTerm || selectedCategory || selectedStatus || selectedPriority;

  if (selectedIssueData) {
    return (
      <IssueDetail 
        issue={selectedIssueData} 
        onBack={() => setSelectedIssue(null)}
      />
    );
  }

  if (showCreateIssue) {
    return (
      <CreateIssue 
        onCancel={() => setShowCreateIssue(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {showMyIssues ? 'My Issues' : 'Community Issues'}
          </h1>
          <p className="text-gray-600 mt-1">
            {showMyIssues 
              ? 'Track and manage your submitted issues' 
              : 'Report and track community issues'
            }
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-600'
              }`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-600'
              }`}
            >
              <List size={18} />
            </button>
          </div>
          
          {/* Create Issue Button */}
          {user?.role === 'citizen' && (
            <button
              onClick={() => setShowCreateIssue(true)}
              className="btn-primary"
            >
              <Plus size={20} className="mr-2" />
              Report Issue
            </button>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search issues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-field"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="input-field"
          >
            <option value="">All Status</option>
            <option value="submitted">Submitted</option>
            <option value="under_review">Under Review</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

          {/* Priority Filter */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="input-field"
          >
            <option value="">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field"
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
            <option value="upvotes">Most Upvoted</option>
            <option value="responses">Most Responses</option>
          </select>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <SlidersHorizontal size={16} />
              <span>Active filters applied</span>
            </div>
            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 hover:text-primary-800 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          Showing {filteredAndSortedIssues.length} of {issues.length} issues
        </span>
        <div className="flex items-center gap-2">
          <Filter size={16} />
          <span>Sorted by: {sortBy.replace('_', ' ')}</span>
        </div>
      </div>

      {/* Issues Grid/List */}
      {filteredAndSortedIssues.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No issues found</h3>
          <p className="text-gray-600 mb-6">
            {hasActiveFilters 
              ? 'Try adjusting your search criteria or filters.' 
              : showMyIssues 
                ? "You haven't reported any issues yet."
                : 'No issues have been reported yet.'
            }
          </p>
          {user?.role === 'citizen' && (
            <button
              onClick={() => setShowCreateIssue(true)}
              className="btn-primary"
            >
              <Plus size={20} className="mr-2" />
              {showMyIssues ? 'Report Your First Issue' : 'Report New Issue'}
            </button>
          )}
        </div>
      ) : (
        <div className={`
          ${viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
            : 'space-y-4'
          }
        `}>
          {filteredAndSortedIssues.map(issue => (
            <IssueCard 
              key={issue.id} 
              issue={issue} 
              onClick={() => setSelectedIssue(issue.id)}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default IssueList;