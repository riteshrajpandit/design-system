'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/shared/ui/Input/Input';
import { Button } from '@/shared/ui/Button/Button';
import { useSession } from '@/entities/session/model/session.context';
import { User } from '@/entities/user/model/types';

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const { login } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic Validation
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required.');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (email === 'admin@company.com') {
        const mockAdminUser: User = {
          id: '1',
          fullName: 'Admin User',
          email: 'admin@company.com',
          role: 'admin',
          permissions: {
            canManageStaff: true,
          },
        };
        login(mockAdminUser);
        router.push('/dashboard');
      } else {
        throw new Error('Invalid email or password.');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-md w-full mx-auto space-y-6 bg-white p-8 rounded-lg shadow-md border border-gray-200"
      aria-label="login-form"
    >
      <h2 className="text-2xl font-bold text-center text-gray-900">Sign in to your account</h2>
      
      <div className="space-y-4">
        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          error={error && !email ? 'Required' : undefined}
          autoComplete="email"
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          error={error && !password ? 'Required' : undefined}
          autoComplete="current-password"
        />
      </div>

      {error && (
        <div role="alert" className="p-3 rounded-md bg-red-50 text-sm text-red-700">
          {error}
        </div>
      )}

      <Button
        type="submit"
        className="w-full"
        isLoading={isLoading}
        disabled={isLoading}
      >
        Sign In
      </Button>
    </form>
  );
};
