import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { userTypeSeeds } from './seeds/userType.seed';
import { roleSeeds } from './seeds/role.seed';
import { moduleSeeds } from './seeds/module.seed';
import bcrypt from 'bcryptjs';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly prisma: PrismaService) {}

  async runSeed() {
    this.logger.log('Starting dynamic database seeding...');

    // 1. Seed Company & Branch
    const defaultCompany = await this.prisma.company.upsert({
      where: { code: 'ANKOR' },
      update: { name: 'Ankor Hospitality Group' },
      create: {
        name: 'Ankor Hospitality Group',
        code: 'ANKOR',
        email: 'info@ankorbook.com',
        phone: '+855 12 345 678',
        address: 'Siem Reap, Cambodia',
      },
    });

    const defaultBranch = await this.prisma.branch.upsert({
      where: { id: 1 },
      update: { name: 'Ankor Main Siem Reap', companyId: defaultCompany.id },
      create: {
        name: 'Ankor Main Siem Reap',
        code: 'SR01',
        companyId: defaultCompany.id,
        phone: '+855 12 345 678',
        address: 'Charles de Gaulle, Siem Reap',
      },
    });
    this.logger.log(`Seeded Default Company (ID: ${defaultCompany.id}) & Branch (ID: ${defaultBranch.id})`);

    // 2. Seed User Types
    for (const ut of userTypeSeeds) {
      await this.prisma.userType.upsert({
        where: { type: ut.type },
        update: { level: ut.level },
        create: { type: ut.type, level: ut.level },
      });
    }
    this.logger.log('Seeded UserTypes');

    const superAdminType = await this.prisma.userType.findUnique({ where: { type: 'SUPER_ADMIN' } });

    // 3. Seed Roles
    for (const r of roleSeeds) {
      await this.prisma.role.upsert({
        where: { roleName: r.roleName },
        update: { roleDesc: r.roleDesc, userTypeId: superAdminType?.id, companyId: defaultCompany.id, branchId: defaultBranch.id },
        create: { roleName: r.roleName, roleDesc: r.roleDesc, userTypeId: superAdminType?.id, companyId: defaultCompany.id, branchId: defaultBranch.id },
      });
    }
    this.logger.log('Seeded Roles');

    // 4. Seed Modules & Permissions
    for (const m of moduleSeeds) {
      const createdModule = await this.prisma.module.upsert({
        where: { moduleKey: m.moduleKey },
        update: {
          moduleName: m.moduleName,
          featured: m.featured,
          sequence: m.sequence,
          menuTitle: m.menuTitle,
        },
        create: {
          moduleName: m.moduleName,
          moduleKey: m.moduleKey,
          featured: m.featured,
          sequence: m.sequence,
          menuTitle: m.menuTitle,
        },
      });

      for (const pName of m.permissions) {
        const existingPermission = await this.prisma.permission.findFirst({
          where: { moduleId: createdModule.id, permissionName: pName },
        });

        if (!existingPermission) {
          await this.prisma.permission.create({
            data: {
              moduleId: createdModule.id,
              permissionName: pName,
            },
          });
        }
      }
    }
    this.logger.log('Seeded Modules & Permissions');

    // 5. Assign All Permissions to DEVELOPER & SUPER_ADMIN roles
    const devRole = await this.prisma.role.findUnique({ where: { roleName: 'DEVELOPER' } });
    const superAdminRole = await this.prisma.role.findUnique({ where: { roleName: 'SUPER_ADMIN' } });
    const allModules = await this.prisma.module.findMany({ include: { permissions: true } });

    const rolesToGrant = [devRole, superAdminRole].filter((r): r is NonNullable<typeof r> => !!r);
    for (const roleObj of rolesToGrant) {
      for (const mod of allModules) {
        for (const perm of mod.permissions) {
          const existingRM = await this.prisma.roleModule.findFirst({
            where: { roleId: roleObj.id, moduleId: mod.id, permissionId: perm.id },
          });
          if (!existingRM) {
            await this.prisma.roleModule.create({
              data: {
                roleId: roleObj.id,
                moduleId: mod.id,
                permissionId: perm.id,
              },
            });
          }
        }
      }
    }
    this.logger.log('Assigned permissions to DEVELOPER & SUPER_ADMIN roles');

    // 6. Seed Super Admin User
    const hashedPassword = await bcrypt.hash('password123', 10);

    const adminEmail = 'admin@ankorbook.com';
    const existingAdmin = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: adminEmail }, { username: 'admin' }],
      },
    });

    if (!existingAdmin) {
      await this.prisma.user.create({
        data: {
          username: 'admin',
          email: adminEmail,
          password: hashedPassword,
          fullName: 'Ankor Administrator',
          name: 'Ankor Admin',
          roleId: devRole?.id || superAdminRole?.id,
          roleName: 'DEVELOPER',
          userTypeId: superAdminType?.id,
          companyId: defaultCompany.id,
          branchId: defaultBranch.id,
          status: 1,
          checkUser: 1,
        },
      });
      this.logger.log(`Created primary admin user: ${adminEmail} (username: admin) with Company & Branch`);
    } else {
      this.logger.log(`Primary admin user already exists: ${adminEmail}`);
    }

    this.logger.log('Database seeding completed successfully.');
  }
}
