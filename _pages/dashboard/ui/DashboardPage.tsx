'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BaseLayout } from '@/shared/ui/Layout/BaseLayout';
import { Button } from '@/shared/ui/Button/Button';
import { useSession } from '@/entities/session/model/session.context';
import { StaffList } from '@/widgets/staff-list/ui/StaffList';

export const DashboardPage: React.FC = () => {
    const { currentUser, isLoading } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !currentUser) {
            router.push('/login');
        }
    }, [currentUser, isLoading, router]);

    if (isLoading || !currentUser) {
        return (
            <BaseLayout>
                <div className="flex justify-center items-center h-64">
                    <p className="text-gray-500 text-lg">Loading...</p>
                </div>
            </BaseLayout>
        );
    }

    return (
        <BaseLayout
            headerSlot={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">HR Dashboard</h2>
                    <Button variant="outline" onClick={() => router.push('/login')}>Logout</Button>
                </div>
            }
        >
            <div className="space-y-8">
                <div className="flex justify-between items-center border-b pb-6 border-gray-200">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Welcome, {currentUser.fullName}
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Here is the current staff overview.
                        </p>
                    </div>
                    {currentUser.role === 'admin' && (
                        <div className="flex-shrink-0">
                            <Button variant="primary">Add New Staff</Button>
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                        Staff Directory
                    </h3>
                    <StaffList />
                </div>
            </div>
        </BaseLayout>
    );
};
