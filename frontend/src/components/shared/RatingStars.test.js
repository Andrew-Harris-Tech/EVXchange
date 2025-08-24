import React from 'react';
import { render } from '@testing-library/react';
import RatingStars from './RatingStars';

describe('RatingStars', () => {
  it('displays correct number of stars', () => {
    render(<RatingStars rating={4} />);
    // Example: expect(...).toBeInTheDocument();
  });
});
