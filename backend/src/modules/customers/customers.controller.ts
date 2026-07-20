import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerMapper } from './mappers/customer.mapper';
import { CustomerResponse } from './responses/customer.response';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('api/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('register')
  async register(@Body() createCustomerDto: CreateCustomerDto): Promise<CustomerResponse> {
    const customer = await this.customersService.create(createCustomerDto);
    return CustomerMapper.toResponse(customer);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Get()
  async findAll(): Promise<CustomerResponse[]> {
    const customers = await this.customersService.findAll();
    return CustomerMapper.toResponseCollection(customers);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CustomerResponse> {
    const customer = await this.customersService.findById(parseInt(id, 10));
    return CustomerMapper.toResponse(customer);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto): Promise<CustomerResponse> {
    const customer = await this.customersService.update(parseInt(id, 10), updateCustomerDto);
    return CustomerMapper.toResponse(customer);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('DEVELOPER', 'ADMIN')
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CustomerResponse> {
    const customer = await this.customersService.remove(parseInt(id, 10));
    return CustomerMapper.toResponse(customer);
  }
}
