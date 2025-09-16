import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import { Platform } from 'react-native';

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
  if (!cfg) return null;

  const handlePress = async () => {
    const redirectUri = AuthSession.makeRedirectUri({
      scheme: Platform.select({ ios: 'exp', android: 'exp' }),
    });
    const authUrl = `${process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000'}${cfg.endpoint}?redirect_uri=${encodeURIComponent(redirectUri)}`;
    const result = await AuthSession.startAsync({ authUrl });
    // TODO: handle result, store JWT, update user context
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
