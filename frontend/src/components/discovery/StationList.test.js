import React from 'react';
import { render } from '@testing-library/react';
import StationList from './StationList';

describe('StationList', () => {
  it('displays stations in a list view', () => {
    render(<StationList />);
    // Example: expect(...).toBeInTheDocument();
  });
});
