import React from 'react';
import { render } from '@testing-library/react';
import AddStationForm from './AddStationForm';

describe('AddStationForm', () => {
  it('allows uploading details and location', () => {
    render(<AddStationForm />);
    // fireEvent.change(...)
  });
});
