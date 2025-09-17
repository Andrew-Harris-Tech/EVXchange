import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import LoginScreen from './src/LoginScreen';
import * as SecureStore from 'expo-secure-store';

// User context for auth state
const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to load JWT/user from secure storage on app start
    (async () => {
      const jwt = await SecureStore.getItemAsync('jwt');
      if (jwt) {
        // Optionally: fetch user profile with JWT
        setUser({ jwt });
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <LoginScreen />
    </UserContext.Provider>
  );
}
