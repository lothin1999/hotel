import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UserMapper } from './mappers/user.mapper';
import { UserResponse } from './responses/user.response';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    const user = await this.usersService.create(createUserDto);
    return UserMapper.toResponse(user);
  }

  @Get()
  async findAll(@Query() query: QueryUserDto): Promise<UserResponse[]> {
    const users = await this.usersService.findAll(query.role);
    return UserMapper.toResponseCollection(users);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponse> {
    const user = await this.usersService.findById(parseInt(id, 10));
    return UserMapper.toResponse(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserResponse> {
    const user = await this.usersService.update(parseInt(id, 10), updateUserDto);
    return UserMapper.toResponse(user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UserResponse> {
    const user = await this.usersService.remove(parseInt(id, 10));
    return UserMapper.toResponse(user);
  }
}
