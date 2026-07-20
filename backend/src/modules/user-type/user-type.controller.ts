import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserTypeService, CreateUserTypeDto, UpdateUserTypeDto } from './user-type.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('api/user-types')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserTypeController {
  constructor(private readonly userTypeService: UserTypeService) {}

  @Get()
  findAll() {
    return this.userTypeService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.userTypeService.findById(id);
  }

  @Roles('DEVELOPER', 'SUPER_ADMIN', 'ADMIN')
  @Post()
  create(@Body() dto: CreateUserTypeDto) {
    return this.userTypeService.create(dto);
  }

  @Roles('DEVELOPER', 'SUPER_ADMIN', 'ADMIN')
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserTypeDto,
  ) {
    return this.userTypeService.update(id, dto);
  }

  @Roles('DEVELOPER', 'SUPER_ADMIN', 'ADMIN')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userTypeService.delete(id);
  }
}
