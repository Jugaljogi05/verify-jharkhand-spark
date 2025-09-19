import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

export type UserRole = 'student' | 'recruiter';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institution?: string;
  registrationNumber?: string;
  company?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  institution?: string;
  registrationNumber?: string;
  company?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: Array<User & { password: string }> = [
  {
    id: '1',
    name: 'John Doe',
    email: 'student@demo.com',
    password: 'student123',
    role: 'student',
    institution: 'Jharkhand University',
    registrationNumber: 'JU2021001',
  },
  {
    id: '2',
    name: 'Sarah Smith',
    email: 'recruiter@demo.com',
    password: 'recruiter123',
    role: 'recruiter',
    company: 'TechCorp Solutions',
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string, role: UserRole) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const foundUser = mockUsers.find(
      u => u.email === email && u.password === password && u.role === role
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      toast({
        title: 'Login Successful',
        description: `Welcome back, ${foundUser.name}!`,
      });
      navigate(role === 'student' ? '/student-dashboard' : '/recruiter-dashboard');
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const register = async (data: RegisterData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newUser: User = {
      id: String(mockUsers.length + 1),
      name: data.name,
      email: data.email,
      role: data.role,
      institution: data.institution,
      registrationNumber: data.registrationNumber,
      company: data.company,
    };

    mockUsers.push({ ...newUser, password: data.password });
    setUser(newUser);

    toast({
      title: 'Registration Successful',
      description: 'Your account has been created successfully!',
    });

    navigate(data.role === 'student' ? '/student-dashboard' : '/recruiter-dashboard');
  };

  const logout = () => {
    setUser(null);
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};