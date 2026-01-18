import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('renders login form inputs and button', () => {
    render(<LoginForm />);
    
    expect(screen.getByRole('form', { name: /login-form/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('shows error message when submitting empty fields', () => {
    render(<LoginForm />);
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);

    expect(screen.getByRole('alert')).toHaveTextContent(/email and password are required/i);
  });

  it('shows loading state when submitting valid form', () => {
    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'admin@company.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    fireEvent.click(submitButton);

    // Initial check for loading state immediately after click
    expect(submitButton).toBeDisabled();
    // Check for spinner presence (assuming Button component renders one with specific class or SVG)
    // Based on previous Button implementation, it renders an SVG with 'animate-spin'
    // Or we can check if it stays disabled
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('displays error logic for invalid credentials', async () => {
    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'wrong@user.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
    
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(screen.getByRole('alert')).toHaveTextContent(/invalid email or password/i);
    }, { timeout: 2000 });
  });
});
