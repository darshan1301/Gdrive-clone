import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [jwtToken, setJwtToken] = useState(() => Cookies.get('jwt'));

  const setToken = (token) => {
    setJwtToken(token);
    Cookies.set('jwt', token, { secure: true, sameSite: 'strict', path: '/' });
  };

  const clearToken = () => {
    setJwtToken("");
    Cookies.remove("jwt", { path: '/' });
  };

  return (
    <AuthContext.Provider value={{ jwtToken, setToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
