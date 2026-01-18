'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { BaseLayout } from '@/shared/ui/Layout/BaseLayout';
import { Button } from '@/shared/ui/Button/Button';
import { CreateStaffForm } from '@/features/staff/create/ui/CreateStaffForm/CreateStaffForm';

export const CreateStaffPage: React.FC = () => {
  const router = useRouter();

  return (
    <BaseLayout
      headerSlot={
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Add New Staff</h2>
          <Button variant="outline" onClick={() => router.push('/dashboard')}>
            &larr; Back to Dashboard
          </Button>
        </div>
      }
    >
      <div className="py-8">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create Staff Account</h1>
            <p className="mt-2 text-gray-600">Enter the details below to onboard a new team member.</p>
        </div>
        <CreateStaffForm />
      </div>
    </BaseLayout>
  );
};
