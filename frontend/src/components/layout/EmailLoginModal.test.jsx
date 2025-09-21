import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import EmailLoginModal from './EmailLoginModal.jsx';

describe('EmailLoginModal', () => {
  it('renders and submits email (no password)', () => {
    const onSubmit = jest.fn();
    render(
      <EmailLoginModal show={true} onClose={() => {}} onSubmit={onSubmit} loading={false} error="" showPassword={false} />
    );
    const input = screen.getByPlaceholderText(/enter admin email/i);
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(onSubmit).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(screen.queryByPlaceholderText(/enter password/i)).not.toBeInTheDocument();
  });

  it('renders and submits email + password', () => {
    const onSubmit = jest.fn();
    render(
      <EmailLoginModal show={true} onClose={() => {}} onSubmit={onSubmit} loading={false} error="" showPassword={true} />
    );
    const emailInput = screen.getByPlaceholderText(/enter admin email/i);
    const passwordInput = screen.getByPlaceholderText(/enter password/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'secret123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(onSubmit).toHaveBeenCalledWith({ email: 'test@example.com', password: 'secret123' });
  });

  it('shows error message', () => {
    render(
      <EmailLoginModal show={true} onClose={() => {}} onSubmit={() => {}} loading={false} error="Invalid email" showPassword={false} />
    );
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  });

  it('disables button when loading', () => {
    render(
      <EmailLoginModal show={true} onClose={() => {}} onSubmit={() => {}} loading={true} error="" showPassword={false} />
    );
    expect(screen.getByRole('button', { name: /logging in/i })).toBeDisabled();
  });
});
