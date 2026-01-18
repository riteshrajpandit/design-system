'use client';

import React, { useState, ReactNode, useEffect } from 'react';
import SessionContext from '../model/session.context';
import { User } from '@/entities/user/model/types';

interface SessionProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = 'app_session_user';

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Restore session on mount
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored session:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <SessionContext.Provider value={{ currentUser, isLoading, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};
