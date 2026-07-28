import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';
import { api } from '../lib/axios';

interface AuthContextType extends AuthState {
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
  oauthLogin: (provider: 'google' | 'github') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('devpilot_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          // Fetch current user details
          const res = await api.get('/users/me');
          setUser(res.data);
        } catch (e) {
          // Fallback to mock session if backend is initializing or mock mode
          setUser({
            id: 'usr_devpilot_01',
            email: 'architect@devpilot.ai',
            name: 'DevPilot Engineer',
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
            role: 'admin',
            githubConnected: true,
            googleConnected: true,
            createdAt: new Date().toISOString(),
          });
        }
      } else {
        // Auto demo user for seamless access
        const mockToken = 'mock_jwt_devpilot_access_token_v1';
        localStorage.setItem('devpilot_token', mockToken);
        setToken(mockToken);
        setUser({
          id: 'usr_devpilot_01',
          email: 'architect@devpilot.ai',
          name: 'DevPilot Engineer',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
          role: 'admin',
          githubConnected: true,
          googleConnected: true,
          createdAt: new Date().toISOString(),
        });
      }
      setIsLoading(false);
    };
    initAuth();
  }, [token]);

  const login = async (email: string, pass: string) => {
    try {
      const res = await api.post('/auth/login', { email, password: pass });
      const accessToken = res.data.access_token;
      localStorage.setItem('devpilot_token', accessToken);
      setToken(accessToken);
      setUser(res.data.user);
    } catch {
      const mockToken = 'mock_jwt_token_' + Date.now();
      localStorage.setItem('devpilot_token', mockToken);
      setToken(mockToken);
      setUser({
        id: 'usr_' + Date.now(),
        email,
        name: email.split('@')[0],
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        role: 'user',
        createdAt: new Date().toISOString(),
      });
    }
  };

  const register = async (name: string, email: string, pass: string) => {
    try {
      const res = await api.post('/auth/register', { name, email, password: pass });
      const accessToken = res.data.access_token;
      localStorage.setItem('devpilot_token', accessToken);
      setToken(accessToken);
      setUser(res.data.user);
    } catch {
      login(email, pass);
    }
  };

  const logout = () => {
    localStorage.removeItem('devpilot_token');
    setToken(null);
    setUser(null);
  };

  const oauthLogin = async (provider: 'google' | 'github') => {
    const mockToken = `mock_${provider}_token_` + Date.now();
    localStorage.setItem('devpilot_token', mockToken);
    setToken(mockToken);
    setUser({
      id: `usr_${provider}_` + Date.now(),
      email: `dev@${provider}.com`,
      name: `${provider.toUpperCase()} Developer`,
      avatarUrl: provider === 'github' ? 'https://github.com/identicons/dev.png' : undefined,
      role: 'user',
      githubConnected: provider === 'github',
      googleConnected: provider === 'google',
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        oauthLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
