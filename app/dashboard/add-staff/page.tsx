'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/entities/session/model/session.context';
import { CreateStaffPage } from '@/pages/staff/create';
import { BaseLayout } from '@/shared/ui/Layout/BaseLayout';

export default function AddStaffRoute() {
  const { currentUser, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
       if (!currentUser) {
            router.push('/login');
       } else if (currentUser.role !== 'admin') {
           // Redirect non-admins back to dashboard or show unauthorized
           router.push('/dashboard');
       }
    }
  }, [currentUser, isLoading, router]);

  if (isLoading) {
      return (
          <BaseLayout>
             <div className="flex justify-center items-center h-64">Loading...</div>
          </BaseLayout>
      );
  }

  // Double check render protection (avoids flash of content)
  if (!currentUser || currentUser.role !== 'admin') {
      console.log('Access denied or no user:', currentUser);
      return null; // Or a dedicated "Unauthorized" component
  }

  return <CreateStaffPage />;
}
