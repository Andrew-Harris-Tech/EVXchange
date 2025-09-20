import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { OpenInAppButton } from './OpenInAppButton';

describe('OpenInAppButton', () => {
  let originalLocation;
  beforeEach(() => {
    jest.useFakeTimers();
    originalLocation = window.location;
    delete window.location;
    window.location = { href: '' };
  });
  afterEach(() => {
    jest.clearAllTimers();
    window.location = originalLocation;
  });

  it('renders with default text', () => {
    const { getByText } = render(<OpenInAppButton deepLink="profile" />);
    expect(getByText('Open in App')).toBeInTheDocument();
  });

  it('opens the app with correct deep link', () => {
    const { getByText } = render(<OpenInAppButton deepLink="profile" />);
    fireEvent.click(getByText('Open in App'));
    expect(window.location.href).toContain('EVXchange://profile');
  });

  it('falls back to store after timeout', () => {
    const { getByText } = render(<OpenInAppButton deepLink="profile" />);
    fireEvent.click(getByText('Open in App'));
    jest.advanceTimersByTime(1500);
    // Should redirect to store if app not installed
  expect(window.location.href).toMatch(/(itunes|play.google)/i);
  });
});
