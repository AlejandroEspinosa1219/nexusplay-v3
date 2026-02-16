
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  allUsers: any[];
  login: (email: string, pass: string) => boolean;
  register: (name: string, email: string, pass: string, referralCode?: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  // Password Recovery
  requestPasswordReset: (email: string) => { success: boolean; otp?: string };
  verifyOTP: (email: string, otp: string) => boolean;
  resetPassword: (email: string, otp: string, newPassword: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Generate a unique referral code
const generateReferralCode = (name: string): string => {
  const clean = name.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 4);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${clean}${random}`;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [pendingOTPs, setPendingOTPs] = useState<Record<string, string>>({});

  const loadUsers = () => {
    const usersStr = localStorage.getItem('nexus_users');
    if (usersStr) {
      setAllUsers(JSON.parse(usersStr));
    }
  };

  useEffect(() => {
    const session = localStorage.getItem('nexus_session');
    if (session) {
      setUser(JSON.parse(session));
    }
    loadUsers();
  }, []);

  const login = (email: string, pass: string): boolean => {
    const usersStr = localStorage.getItem('nexus_users');
    const users = usersStr ? JSON.parse(usersStr) : [];

    const foundUser = users.find((u: any) => u.email === email && u.password === pass);

    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: 'user',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${foundUser.name}`,
        referralCode: foundUser.referralCode,
        referralBalance: foundUser.referralBalance || 0,
        referralCount: foundUser.referralCount || 0
      };
      setUser(userData);
      localStorage.setItem('nexus_session', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, pass: string, referralCode?: string): boolean => {
    const usersStr = localStorage.getItem('nexus_users');
    const users = usersStr ? JSON.parse(usersStr) : [];

    if (users.some((u: any) => u.email === email)) {
      return false;
    }

    const myReferralCode = generateReferralCode(name);

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: pass,
      date: new Date().toLocaleDateString('es-CO'),
      referralCode: myReferralCode,
      referralBalance: 0,
      referralCount: 0,
      usedReferral: referralCode || null
    };

    // If using a referral code, credit the referrer
    if (referralCode) {
      const referrer = users.find((u: any) => u.referralCode === referralCode);
      if (referrer) {
        referrer.referralBalance = (referrer.referralBalance || 0) + 5000;
        referrer.referralCount = (referrer.referralCount || 0) + 1;
      }
    }

    users.push(newUser);
    localStorage.setItem('nexus_users', JSON.stringify(users));

    setAllUsers(users);

    // Auto login
    login(email, pass);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nexus_session');
  };

  // Password Recovery
  const requestPasswordReset = (email: string): { success: boolean; otp?: string } => {
    const usersStr = localStorage.getItem('nexus_users');
    const users = usersStr ? JSON.parse(usersStr) : [];
    const found = users.find((u: any) => u.email === email);

    if (!found) return { success: false };

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setPendingOTPs(prev => ({ ...prev, [email]: otp }));
    return { success: true, otp };
  };

  const verifyOTP = (email: string, otp: string): boolean => {
    return pendingOTPs[email] === otp;
  };

  const resetPassword = (email: string, otp: string, newPassword: string): boolean => {
    if (pendingOTPs[email] !== otp) return false;

    const usersStr = localStorage.getItem('nexus_users');
    const users = usersStr ? JSON.parse(usersStr) : [];
    const userIndex = users.findIndex((u: any) => u.email === email);

    if (userIndex === -1) return false;

    users[userIndex].password = newPassword;
    localStorage.setItem('nexus_users', JSON.stringify(users));
    setAllUsers(users);

    // Clean up OTP
    setPendingOTPs(prev => {
      const next = { ...prev };
      delete next[email];
      return next;
    });

    return true;
  };

  return (
    <AuthContext.Provider value={{
      user, allUsers, login, register, logout, isAuthenticated: !!user,
      requestPasswordReset, verifyOTP, resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
