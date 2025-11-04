import React, { createContext, useContext, useState } from 'react';
import { mockIssues } from '../data/mockData';

const IssueContext = createContext();

export const useIssues = () => {
  const context = useContext(IssueContext);
  if (context === undefined) {
    throw new Error('useIssues must be used within an IssueProvider');
  }
  return context;
};

export const IssueProvider = ({ children }) => {
  const [issues, setIssues] = useState(mockIssues);

  const addIssue = (issueData) => {
    const newIssue = {
      ...issueData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      responses: [],
      upvotes: 0,
    };
    
    setIssues(prev => [newIssue, ...prev]);
  };

  const updateIssue = (issueId, updates) => {
    setIssues(prev => prev.map(issue => 
      issue.id === issueId 
        ? { ...issue, ...updates, updatedAt: new Date().toISOString() }
        : issue
    ));
  };

  const addResponse = (issueId, responseData) => {
    const newResponse = {
      ...responseData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    setIssues(prev => prev.map(issue => 
      issue.id === issueId 
        ? { 
            ...issue, 
            responses: [...issue.responses, newResponse],
            updatedAt: new Date().toISOString()
          }
        : issue
    ));
  };

  const upvoteIssue = (issueId) => {
    setIssues(prev => prev.map(issue => 
      issue.id === issueId 
        ? { ...issue, upvotes: issue.upvotes + 1 }
        : issue
    ));
  };

  const deleteIssue = (issueId) => {
    setIssues(prev => prev.filter(issue => issue.id !== issueId));
  };

  return (
    <IssueContext.Provider value={{
      issues,
      addIssue,
      updateIssue,
      addResponse,
      upvoteIssue,
      deleteIssue,
    }}>
      {children}
    </IssueContext.Provider>
  );
};