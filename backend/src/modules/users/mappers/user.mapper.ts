import { User } from '@prisma/client';
import { UserResponse } from '../responses/user.response';

export class UserMapper {
  static toResponse(user: User): UserResponse {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt.toISOString(),
    };
  }

  static toResponseCollection(users: User[]): UserResponse[] {
    return users.map(user => this.toResponse(user));
  }
}
