import React, { useEffect, useState } from 'react';
import { User } from '@/entities/user/model/types';
import { UserCard } from '@/entities/user/ui/UserCard/UserCard';

export const StaffList: React.FC = () => {
    const [stats, setStats] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching data
        const loadStats = async () => {
            await new Promise(resolve => setTimeout(resolve, 500));
            const mockUsers: User[] = [
                { id: '1', fullName: 'Alice Johnson', email: 'alice@company.com', role: 'staff', permissions: { canManageStaff: false } },
                { id: '2', fullName: 'Bob Smith', email: 'bob@company.com', role: 'staff', permissions: { canManageStaff: false } },
                { id: '3', fullName: 'Charlie Davis', email: 'charlie@company.com', role: 'staff', permissions: { canManageStaff: false } },
            ];
            setStats(mockUsers);
            setIsLoading(false);
        };
        loadStats();
    }, []);

    if (isLoading) {
        return <div className="text-center py-10">Loading staff list...</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map(user => (
                <UserCard key={user.id} user={user} />
            ))}
        </div>
    );
};
