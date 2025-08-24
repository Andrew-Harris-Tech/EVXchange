import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('throws if rendered outside Router', () => {
    // Suppress error output for this test
    const originalError = console.error;
    console.error = () => {};
    expect(() => render(<App />)).toThrow();
    console.error = originalError;
  });
});
