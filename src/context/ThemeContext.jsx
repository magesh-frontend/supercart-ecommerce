import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(prev => !prev);

  const theme = {
    background: darkMode ? '#121212' : '#f5f5f5',
    color: darkMode ? '#ffffff' : '#333333',
    cardBg: darkMode ? '#1e1e1e' : '#ffffff',
    navBg: darkMode ? '#000000' : '#222222',
    border: darkMode ? '#444' : '#ddd',
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}