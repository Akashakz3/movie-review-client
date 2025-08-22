import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('auth_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('auth_user');
    }
  }, [user]);

  const login = async (email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock authentication
    if (email && password) {
      const mockUser = {
        id: Math.random().toString(36),
        name: email.split('@')[0],
        email,
        role: email.includes('admin') ? 'admin' : 'user',
        token: 'mock-jwt-token'
      };
      setUser(mockUser);
      return { success: true, user: mockUser };
    }
    
    throw new Error('Invalid credentials');
  };

  const signup = async (name, email, password, role) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (name && email && password) {
      const mockUser = {
        id: Math.random().toString(36),
        name,
        email,
        role: role.toLowerCase(),
        token: 'mock-jwt-token'
      };
      setUser(mockUser);
      return { success: true, user: mockUser };
    }
    
    throw new Error('Please fill all required fields');
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}