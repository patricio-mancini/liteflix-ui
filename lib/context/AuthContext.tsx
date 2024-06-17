'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { logout as logoutApi } from '../api/client';

interface User {
  googleId: string;
  name: string;
  email: string;
  photo: string;
  _id: string;
}

interface AuthContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = getCookie('userData');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
  };

  const logout = async () => {
    const response = await logoutApi();
    if (response.isSuccess) {
      setUser(null);
      document.cookie = 'userData=; Max-Age=0; path=/;';
    } else {
      console.error('Failed to logout:', response.errorMessage);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const getCookie = (name: string): string | null => {
  const matches = document.cookie.match(new RegExp(
    `(?:^|; )${name.replace(/([.$?*|{}()[]\/+^])/g, '\\$1')}=([^;]*)`
  ));
  return matches ? decodeURIComponent(matches[1]) : null;
};
