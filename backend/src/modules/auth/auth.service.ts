import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { AuthRepository } from './auth.repository';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    return this.usersService.create(registerDto);
  }

  async login(loginDto: LoginDto): Promise<{ token: string; user: any }> {
    const identifier = loginDto.email || (loginDto as any).username;
    if (!identifier) {
      throw new UnauthorizedException('Email or username is required');
    }

    const user = await this.authRepository.findByEmailOrUsername(identifier);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.status === 0) {
      throw new UnauthorizedException('Account disabled');
    }

    const isValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const permissions = user.role?.roleModules
      ?.map((rm) => rm.permission?.permissionName)
      .filter((p): p is string => !!p) || [];

    const roleName = user.role?.roleName || user.roleName || 'USER';

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      roleId: user.roleId,
      role: roleName,
      userTypeId: user.userTypeId,
      companyId: user.companyId,
      branchId: user.branchId,
      permissions,
    };

    const token = this.jwtService.sign(payload);

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName || user.name,
        image: user.image,
        roleId: user.roleId,
        roleName: roleName,
        userTypeId: user.userTypeId,
        userType: user.userType?.type,
        companyId: user.companyId,
        branchId: user.branchId,
        status: user.status,
        permissions,
      },
    };
  }
}
