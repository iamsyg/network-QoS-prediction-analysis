// context/ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeColors {
  primary: string;
  primaryDark: string;
  background: string;
  card: string;
  text: string;
  textLight: string; 
  textSecondary: string;
  border: string; 
  shadow: string;
  success: string;
  warning: string;
  error: string;
}


interface ThemeContextType {
  colors: ThemeColors;
  isDark: boolean;
  toggleTheme: () => void;
}

const lightColors: ThemeColors = {
  primary: '#6366F1',
  primaryDark: '#4F46E5',
  background: '#F8FAFC',
  card: '#FFFFFF',
  text: '#1E293B',
  textLight: '#FFFFFF',
  textSecondary: '#64748B',
  border: '#E2E8F0',
  shadow: '#000000',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
};

const darkColors: ThemeColors = {
  primary: '#818CF8',
  primaryDark: '#6366F1',
  background: '#0F172A',
  card: '#1E293B',
  text: '#F1F5F9',
  textLight: '#F1F5F9',
  textSecondary: '#94A3B8',
  border: '#334155',
  shadow: '#000000',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ colors, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};