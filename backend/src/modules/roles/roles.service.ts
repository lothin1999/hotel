import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { Role, Module, Permission } from '@prisma/client';

export interface CreateRoleDto {
  roleName: string;
  roleDesc?: string;
  userTypeId?: number;
  permissionIds?: number[];
}

export interface UpdateRoleDto {
  roleName?: string;
  roleDesc?: string;
  userTypeId?: number;
  permissionIds?: number[];
}

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.role.findMany({
      where: { deletedAt: null },
      include: {
        userType: true,
        roleModules: {
          include: {
            module: true,
            permission: true,
          },
        },
      },
      orderBy: { id: 'asc' },
    });
  }

  async findById(id: number) {
    const role = await this.prisma.role.findFirst({
      where: { id, deletedAt: null },
      include: {
        userType: true,
        roleModules: {
          include: {
            module: true,
            permission: true,
          },
        },
      },
    });

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    return role;
  }

  async create(dto: CreateRoleDto) {
    const existing = await this.prisma.role.findUnique({
      where: { roleName: dto.roleName },
    });

    if (existing) {
      throw new ConflictException(`Role '${dto.roleName}' already exists`);
    }

    const role = await this.prisma.role.create({
      data: {
        roleName: dto.roleName,
        roleDesc: dto.roleDesc,
        userTypeId: dto.userTypeId,
      },
    });

    if (dto.permissionIds && dto.permissionIds.length > 0) {
      await this.assignPermissions(role.id, dto.permissionIds);
    }

    return this.findById(role.id);
  }

  async update(id: number, dto: UpdateRoleDto) {
    await this.findById(id);

    await this.prisma.role.update({
      where: { id },
      data: {
        roleName: dto.roleName,
        roleDesc: dto.roleDesc,
        userTypeId: dto.userTypeId,
      },
    });

    if (dto.permissionIds !== undefined) {
      await this.assignPermissions(id, dto.permissionIds);
    }

    return this.findById(id);
  }

  async delete(id: number) {
    await this.findById(id);
    return this.prisma.role.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async assignPermissions(roleId: number, permissionIds: number[]) {
    // Clear existing permissions for role
    await this.prisma.roleModule.deleteMany({
      where: { roleId },
    });

    const permissions = await this.prisma.permission.findMany({
      where: { id: { in: permissionIds } },
    });

    for (const perm of permissions) {
      await this.prisma.roleModule.create({
        data: {
          roleId,
          moduleId: perm.moduleId,
          permissionId: perm.id,
        },
      });
    }

    return this.findById(roleId);
  }

  async findAllModulesWithPermissions() {
    return this.prisma.module.findMany({
      include: {
        permissions: true,
      },
      orderBy: { sequence: 'asc' },
    });
  }
}
