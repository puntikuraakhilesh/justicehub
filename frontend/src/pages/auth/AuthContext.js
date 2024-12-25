import { createContext, useState, useEffect } from 'react';
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUserName] = useState(null);
  const [role,setRole]=useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    const storedUsername = localStorage.getItem('username');
    const storedRole=localStorage.getItem('role');
    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(storedUserId);
      setIsLoggedIn(true);
      setUserName(storedUsername);
      setRole(storedRole);
    }
  }, []);
  const login = (newToken, newUserId,newRole,newUsername) => {
    setToken(newToken);
    setUserId(newUserId);
    setIsLoggedIn(true);
    setUserName(newUsername);
    setRole(newRole);
    localStorage.setItem('token', newToken);
    localStorage.setItem('userId', newUserId);
    localStorage.setItem('username',newUsername);
    localStorage.setItem('role',newRole);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setIsLoggedIn(false);
    setUserName(null);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  };

  const authContextValue = {
    token,
    userId,
    isLoggedIn,
    username,
    role,
    login,
    logout,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;