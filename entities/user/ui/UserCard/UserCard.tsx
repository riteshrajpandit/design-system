import React from 'react';
import { User } from '../../model/types';
import { Button } from '@/shared/ui/Button/Button';

interface UserCardProps {
  user: User;
  onViewDetails?: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onViewDetails }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{user.fullName}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide ${
          user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
        }`}>
          {user.role}
        </span>
      </div>
      
      <div className="mt-4">
        <Button variant="outline" className="w-full sm:w-auto" onClick={onViewDetails}>
          View Details
        </Button>
      </div>
    </div>
  );
};
