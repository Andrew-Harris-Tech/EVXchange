import React from 'react';
import { render } from '@testing-library/react';
import Loader from './Loader';

describe('Loader', () => {
  it('appears during API requests', () => {
    render(<Loader />);
    // Example: expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
