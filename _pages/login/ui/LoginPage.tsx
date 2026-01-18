import React from 'react';
import { BaseLayout } from '@/shared/ui/Layout/BaseLayout';
import { LoginForm } from '@/features/auth/login/ui/LoginForm/LoginForm';

export const LoginPage: React.FC = () => {
  return (
    <BaseLayout>
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">
          HR Portal Login
        </h1>
        <LoginForm />
      </div>
    </BaseLayout>
  );
};
