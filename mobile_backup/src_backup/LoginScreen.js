import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OAuthButton from './components/OAuthButton';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <OAuthButton provider="google" />
      <OAuthButton provider="facebook" />
      <OAuthButton provider="linkedin" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
  },
});
