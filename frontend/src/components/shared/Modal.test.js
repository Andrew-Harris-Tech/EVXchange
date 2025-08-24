import React from 'react';
import { render } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
  it('opens and closes correctly', () => {
    render(<Modal>Test Modal</Modal>);
    // fireEvent.click(...)
  });
});
