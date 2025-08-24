import React from 'react';
import { render } from '@testing-library/react';
import ReviewForm from './ReviewForm';

describe('ReviewForm', () => {
  it('submits a review and updates list', () => {
    render(<ReviewForm />);
    // fireEvent.submit(...)
  });
});
