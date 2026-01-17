import { User } from '../model/types';

export class UserService {
  static async getUserById(id: string): Promise<User> {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock response
    return {
      id,
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      role: 'admin',
      permissions: {
        canManageStaff: true,
      },
    };
  }
}
