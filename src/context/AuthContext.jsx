import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  const signup = (name, email, password) => {
    const newUser = { name, email, password };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const login = (email, password) => {
    const saved = JSON.parse(localStorage.getItem('user'));
    if (saved && saved.email === email && saved.password === password) {
      setUser(saved);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}