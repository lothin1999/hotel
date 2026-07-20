import { User } from '@prisma/client';
import { AuthResponse } from '../responses/auth.response';
import { UserMapper } from '../../users/mappers/user.mapper';

export class AuthMapper {
  static toResponse(token: string, user: User): AuthResponse {
    return {
      token,
      user: UserMapper.toResponse(user),
    };
  }
}
