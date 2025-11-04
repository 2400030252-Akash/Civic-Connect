import React, { createContext, useContext, useState } from 'react';
import { mockNotifications } from '../data/mockData';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const addNotification = (notificationData) => {
    const newNotification = {
      ...notificationData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true }
        : notification
    ));
  };

  const markAllAsRead = (userId) => {
    setNotifications(prev => prev.map(notification => 
      notification.userId === userId 
        ? { ...notification, read: true }
        : notification
    ));
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
  };

  const getUnreadCount = (userId) => {
    return notifications.filter(notification => 
      notification.userId === userId && !notification.read
    ).length;
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      getUnreadCount,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};