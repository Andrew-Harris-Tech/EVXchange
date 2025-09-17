import React from 'react';
import OAuthButton from '../components/shared/OAuthButton.jsx';

export default function Login() {
  return (
    <div style={{ padding: 32 }}>
      <h2>Login</h2>
      <OAuthButton provider="google" />
      <OAuthButton provider="facebook" />
      <OAuthButton provider="linkedin" />
    </div>
  );
}
