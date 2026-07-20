import { Injectable } from '@nestjs/common';
import { Customer } from '@prisma/client';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCustomerDto): Promise<Customer> {
    return this.prisma.customer.create({ data });
  }

  async findByEmail(email: string): Promise<Customer | null> {
    return this.prisma.customer.findUnique({ where: { email } });
  }

  async findByPhone(phoneNumber: string): Promise<Customer | null> {
    return this.prisma.customer.findUnique({ where: { phoneNumber } });
  }

  async findById(id: number): Promise<Customer | null> {
    return this.prisma.customer.findUnique({ where: { id } });
  }

  async findAll(): Promise<Customer[]> {
    return this.prisma.customer.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async update(id: number, data: UpdateCustomerDto): Promise<Customer> {
    return this.prisma.customer.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Customer> {
    return this.prisma.customer.delete({ where: { id } });
  }
}
