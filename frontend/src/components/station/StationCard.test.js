import React from 'react';
import { render } from '@testing-library/react';
import StationCard from './StationCard';

describe('StationCard', () => {
  it('displays station details', () => {
    render(<StationCard />);
    // Example: expect(...).toBeInTheDocument();
  });
});
