export type UserRole = 'admin' | 'staff';

export interface UserPermissions {
  canManageStaff: boolean;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  permissions: UserPermissions;
}
