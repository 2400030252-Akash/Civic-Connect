import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { IssueProvider } from './context/IssueContext';
import { NotificationProvider } from './context/NotificationContext';
import Login from './components/Auth/Login';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import IssueList from './components/Issues/IssueList';
import PollList from './components/Polls/PollList';
import UserManagement from './components/Admin/UserManagement';
import Analytics from './components/Analytics/Analytics';
import Settings from './components/Settings/Settings';
import Representatives from './components/Representatives/Representatives';
import Discussions from './components/Discussions/Discussions';
import Moderation from './components/Moderation/Moderation';

function AppContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!user) {
    return <Login />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'issues':
      case 'my-issues':
        return <IssueList showMyIssues={activeTab === 'my-issues'} />;
      case 'polls':
        return <PollList />;
      case 'discussions':
        return <Discussions />;
      case 'representatives':
        return <Representatives />;
      case 'users':
        return <UserManagement />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      case 'moderation':
        return <Moderation />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          isMobileMenuOpen={isMobileMenuOpen}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <IssueProvider>
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </IssueProvider>
    </AuthProvider>
  );
}

export default App;