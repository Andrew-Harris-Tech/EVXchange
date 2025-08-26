import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext({ user: null, login: () => {}, logout: () => {} });

export function AuthProvider({ children, value }) {
  const [user, setUser] = useState(value?.user ?? null);
  const login = value?.login || ((userData) => setUser(userData));
  const logout = value?.logout || (() => setUser(null));
  const contextValue = value || { user, login, logout };
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function RequireAuth({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <div>You must be logged in to view this page.</div>;
  }
  return children;
}
