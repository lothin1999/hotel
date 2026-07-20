import { UserResponse } from '../../users/responses/user.response';

export class AuthResponse {
  token!: string;
  user!: UserResponse;
}
