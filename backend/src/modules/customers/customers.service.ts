import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Customer } from '@prisma/client';
import { CustomersRepository } from './customers.repository';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import bcrypt from 'bcryptjs';

@Injectable()
export class CustomersService {
  constructor(private customersRepository: CustomersRepository) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    if (createCustomerDto.email) {
      const existing = await this.customersRepository.findByEmail(createCustomerDto.email);
      if (existing) {
        throw new ConflictException('Customer account with this email already exists');
      }
    }

    if (createCustomerDto.phoneNumber) {
      const existingPhone = await this.customersRepository.findByPhone(createCustomerDto.phoneNumber);
      if (existingPhone) {
        throw new ConflictException('Customer account with this phone number already exists');
      }
    }

    if (createCustomerDto.password) {
      createCustomerDto.password = await bcrypt.hash(createCustomerDto.password, 10);
    }

    return this.customersRepository.create(createCustomerDto);
  }

  async findById(id: number): Promise<Customer> {
    const customer = await this.customersRepository.findById(id);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async findByEmail(email: string): Promise<Customer | null> {
    return this.customersRepository.findByEmail(email);
  }

  async findAll(): Promise<Customer[]> {
    return this.customersRepository.findAll();
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    await this.findById(id);

    if (updateCustomerDto.password) {
      updateCustomerDto.password = await bcrypt.hash(updateCustomerDto.password, 10);
    }

    return this.customersRepository.update(id, updateCustomerDto);
  }

  async remove(id: number): Promise<Customer> {
    await this.findById(id);
    return this.customersRepository.delete(id);
  }
}
