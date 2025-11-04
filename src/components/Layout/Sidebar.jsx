import React, { useEffect } from 'react';
import { 
  Home, 
  FileText, 
  MessageSquare, 
  BarChart3, 
  Users, 
  Settings, 
  Shield,
  Vote,
  Flag,
  Eye,
  LogOut,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getInitial } from '../../utils/string';

const Sidebar = ({ activeTab, setActiveTab, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { user, logout } = useAuth();

  // Close mobile menu when clicking outside or on escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, setIsMobileMenuOpen]);

  const getNavItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'issues', label: 'Issues', icon: FileText },
      { id: 'discussions', label: 'Discussions', icon: MessageSquare },
      { id: 'polls', label: 'Community Polls', icon: Vote },
    ];

    if (user?.role === 'admin') {
      return [
        ...baseItems,
        { id: 'users', label: 'User Management', icon: Users },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'settings', label: 'Settings', icon: Settings },
      ];
    }

    if (user?.role === 'moderator') {
      return [
        ...baseItems,
        { id: 'moderation', label: 'Moderation', icon: Shield },
        { id: 'reports', label: 'Reports', icon: Flag },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
      ];
    }

    if (user?.role === 'politician') {
      return [
        ...baseItems,
        { id: 'my-constituents', label: 'My Constituents', icon: Users },
        { id: 'public-view', label: 'Public Profile', icon: Eye },
        { id: 'analytics', label: 'Performance', icon: BarChart3 },
      ];
    }

    // Citizen view
    return [
      ...baseItems,
      { id: 'my-issues', label: 'My Issues', icon: FileText },
      { id: 'representatives', label: 'My Representatives', icon: Users },
    ];
  };

  const navItems = getNavItems();

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-4 bg-gray-800">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">CC</span>
              </div>
              <h2 className="text-xl font-bold text-white">CiviConnect</h2>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`
                    flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                    ${activeTab === item.id
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }
                  `}
                >
                  <Icon size={20} className="mr-3 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User info and logout */}
          <div className="p-4 bg-gray-800 border-t border-gray-700">
            <div className="flex items-center mb-3">
              <div className="h-10 w-10 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                {getInitial(user?.name)}
              </div>
              <div className="ml-3 min-w-0 flex-1">
                <div className="text-sm font-medium text-white truncate">
                  {user?.name}
                </div>
                <div className="text-xs text-gray-400 capitalize">
                  {user?.role}
                </div>
                {user?.district && (
                  <div className="text-xs text-gray-500 truncate">
                    {user.district}
                  </div>
                )}
              </div>
            </div>
            
            <button
              onClick={logout}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-300 hover:text-white hover:bg-red-600 rounded-lg transition-colors duration-200"
            >
              <LogOut size={16} className="mr-3" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;