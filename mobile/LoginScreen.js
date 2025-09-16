

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from './config';
import * as AuthSession from 'expo-auth-session';
import { APP_BASE_URL } from '@env';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    setError('');
    try {
      const response = await fetch(`${Config.API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Login failed');
        return;
      }
      await AsyncStorage.setItem('token', data.token);
      Alert.alert('Login successful');
      // TODO: Navigate to main app
    } catch (err) {
      setError('Network error');
    }
  };


  const handleOAuth = async (provider) => {
    try {
      // Compose the backend OAuth URL
      const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
      const authUrl = `${APP_BASE_URL}/auth/oauth_login/${provider}?redirect_uri=${encodeURIComponent(redirectUri)}`;
      const result = await AuthSession.startAsync({ authUrl });
      if (result.type === 'success' && result.params && result.params.token) {
        await AsyncStorage.setItem('token', result.params.token);
        Alert.alert('OAuth login successful');
        // TODO: Navigate to main app
      } else if (result.type === 'error') {
        setError(result.params.error_description || 'OAuth login failed');
      }
    } catch (err) {
      setError('OAuth flow error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <View style={styles.oauthContainer}>
        <Text style={styles.oauthText}>Or login with:</Text>
        <View style={styles.oauthButtons}>
          <TouchableOpacity style={[styles.oauthButton, { backgroundColor: '#4285F4' }]} onPress={() => handleOAuth('google')}>
            <Text style={styles.oauthButtonText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.oauthButton, { backgroundColor: '#1877F3' }]} onPress={() => handleOAuth('facebook')}>
            <Text style={styles.oauthButtonText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.oauthButton, { backgroundColor: '#0077B5' }]} onPress={() => handleOAuth('linkedin')}>
            <Text style={styles.oauthButtonText}>LinkedIn</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
  link: {
    color: '#007bff',
    marginTop: 16,
    textAlign: 'center',
  },
  oauthContainer: {
    marginVertical: 24,
    alignItems: 'center',
  },
  oauthText: {
    marginBottom: 8,
    color: '#888',
  },
  oauthButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  oauthButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 6,
    marginHorizontal: 6,
  },
  oauthButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
