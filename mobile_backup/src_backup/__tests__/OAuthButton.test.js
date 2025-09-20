import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import OAuthButton from '../components/OAuthButton';

describe('OAuthButton (Expo)', () => {
  it('renders Google button', () => {
    const { getByText } = render(<OAuthButton provider="google" />);
    expect(getByText(/login with google/i)).toBeTruthy();
  });

  it('renders Facebook button', () => {
    const { getByText } = render(<OAuthButton provider="facebook" />);
    expect(getByText(/login with facebook/i)).toBeTruthy();
  });

  it('renders LinkedIn button', () => {
    const { getByText } = render(<OAuthButton provider="linkedin" />);
    expect(getByText(/login with linkedin/i)).toBeTruthy();
  });

  it('does not render for unknown provider', () => {
    const { toJSON } = render(<OAuthButton provider="unknown" />);
    expect(toJSON()).toBeNull();
  });

  it('calls AuthSession.startAsync on press', async () => {
    const mockStartAsync = jest.fn().mockResolvedValue({ type: 'cancel' });
    jest.spyOn(require('expo-auth-session'), 'startAsync').mockImplementation(mockStartAsync);
    const { getByText } = render(<OAuthButton provider="google" />);
    fireEvent.press(getByText(/login with google/i));
    expect(mockStartAsync).toHaveBeenCalled();
  });
});
