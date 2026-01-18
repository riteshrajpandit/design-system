'use client';

import React, { useState, ReactNode } from 'react';
import SessionContext from '../model/session.context';
import { User } from '@/entities/user/model/types';

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = (user: User) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <SessionContext.Provider value={{ currentUser, isLoading, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};
