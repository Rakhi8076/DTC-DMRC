import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string, gender: 'male' | 'female' | 'other') => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('dtc_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const signup = async (email: string, password: string, fullName: string, gender: 'male' | 'female' | 'other') => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      fullName,
      gender,
      role: 'passenger',
    };

    localStorage.setItem('dtc_user', JSON.stringify(newUser));
    localStorage.setItem(`dtc_pass_${email}`, password);
    setUser(newUser);
  };

  const login = async (email: string, password: string) => {
    const storedPassword = localStorage.getItem(`dtc_pass_${email}`);

    if (email === 'admin@dtc.gov.in' && password === 'admin123') {
      const adminUser: User = {
        id: 'admin-001',
        email,
        fullName: 'DTC Administrator',
        gender: 'other',
        role: 'admin',
      };
      localStorage.setItem('dtc_user', JSON.stringify(adminUser));
      setUser(adminUser);
      return;
    }

    if (storedPassword === password) {
      const storedUser = localStorage.getItem('dtc_user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (userData.email === email) {
          setUser(userData);
          return;
        }
      }
    }

    throw new Error('Invalid credentials');
  };

  const logout = () => {
    localStorage.removeItem('dtc_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
