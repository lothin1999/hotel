import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthMapper } from './mappers/auth.mapper';
import { AuthResponse } from './responses/auth.response';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserMapper } from '../users/mappers/user.mapper';
import { UserResponse } from '../users/responses/user.response';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<UserResponse> {
    const user = await this.authService.register(registerDto);
    return UserMapper.toResponse(user);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    const { token, user } = await this.authService.login(loginDto);
    return AuthMapper.toResponse(token, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any): UserResponse {
    return UserMapper.toResponse(req.user);
  }
}
