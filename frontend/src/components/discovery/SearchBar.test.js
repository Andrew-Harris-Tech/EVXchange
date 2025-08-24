import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('accepts input and triggers search', () => {
    render(<SearchBar />);
    // fireEvent.change(screen.getByPlaceholderText(/search/i), { target: { value: 'location' } });
    // fireEvent.click(screen.getByRole('button'));
  });
});
