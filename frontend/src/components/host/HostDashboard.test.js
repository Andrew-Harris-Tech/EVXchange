import React from 'react';
import { render } from '@testing-library/react';
import HostDashboard from './HostDashboard';

describe('HostDashboard', () => {
  it('shows listed stations for host', () => {
    render(<HostDashboard />);
    // Example: expect(...).toBeInTheDocument();
  });
});
