import { render, screen, fireEvent } from '@testing-library/react';
import TestUI from '../TestUI';

describe('TestUI basic UI', () => {
  it('renders input, button, and output', () => {
    render(<TestUI />);
    expect(screen.getByTestId('test-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-btn')).toBeInTheDocument();
    expect(screen.getByTestId('output')).toBeInTheDocument();
  });

  it('shows output after submit', () => {
    render(<TestUI />);
    const input = screen.getByTestId('test-input');
    const button = screen.getByTestId('submit-btn');
    fireEvent.change(input, { target: { value: 'hello world' } });
    fireEvent.click(button);
    expect(screen.getByTestId('output').textContent).toBe('hello world');
  });
});
