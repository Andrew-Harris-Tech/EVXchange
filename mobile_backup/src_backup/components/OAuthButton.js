
import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, Alert } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useUser } from '../../../App';

const providerConfig = {
  google: {
    label: 'Google',
    color: '#4285F4',
    icon: require('../assets/google.png'),
    endpoint: '/auth/login/google',
  },
  facebook: {
    label: 'Facebook',
    color: '#1877F3',
    icon: require('../assets/facebook.png'),
    endpoint: '/auth/login/facebook',
  },
  linkedin: {
    label: 'LinkedIn',
    color: '#0077B5',
    icon: require('../assets/linkedin.png'),
    endpoint: '/auth/login/linkedin',
  },
};

export default function OAuthButton({ provider }) {
  const cfg = providerConfig[provider];
  const { setUser } = useUser ? useUser() : { setUser: () => {} };
  if (!cfg) return null;

  const handlePress = async () => {
    try {
      const redirectUri = AuthSession.makeRedirectUri({
        scheme: Platform.select({ ios: 'exp', android: 'exp' }),
      });
      const authUrl = `${process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000'}${cfg.endpoint}?redirect_uri=${encodeURIComponent(redirectUri)}`;
      const result = await AuthSession.startAsync({ authUrl });
      if (result.type === 'success' && result.url) {
        // Parse JWT from URL fragment or query param (e.g., ?jwt=...)
        const match = result.url.match(/[?&]jwt=([^&#]+)/);
        if (match) {
          const jwt = decodeURIComponent(match[1]);
          await SecureStore.setItemAsync('jwt', jwt);
          setUser && setUser({ jwt });
          Alert.alert('Login Success', 'You are now logged in!');
          // Optionally: navigate to profile/dashboard
        } else {
          Alert.alert('Login Failed', 'No token received.');
        }
      } else if (result.type === 'error') {
        Alert.alert('Login Error', result.errorCode || 'OAuth error');
      }
    } catch (e) {
      Alert.alert('Login Error', e.message || 'Unknown error');
    }
  };

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: cfg.color }]} onPress={handlePress}>
      <Image source={cfg.icon} style={styles.icon} />
      <Text style={styles.text}>Login with {cfg.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 6,
    marginVertical: 8,
    width: 260,
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
