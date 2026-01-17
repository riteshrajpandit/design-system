import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserCard } from './UserCard';
import { User } from '../../model/types';

const mockUser: User = {
  id: '1',
  fullName: 'Alice Smith',
  email: 'alice@example.com',
  role: 'admin',
  permissions: {
    canManageStaff: true,
  },
};

describe('UserCard', () => {
  it('renders user details correctly', () => {
    render(<UserCard user={mockUser} />);
    
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    expect(screen.getByText('admin')).toBeInTheDocument();
  });

  it('renders call to action button', () => {
    const handleViewDetails = jest.fn();
    render(<UserCard user={mockUser} onViewDetails={handleViewDetails} />);
    
    const button = screen.getByRole('button', { name: /view details/i });
    expect(button).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(handleViewDetails).toHaveBeenCalledTimes(1);
  });
});
