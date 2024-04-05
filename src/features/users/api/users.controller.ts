import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query, UseGuards,
} from '@nestjs/common';
import { UsersService } from '../application/users.service';
import { QueryUsersRequestType } from '../types/input';
import { createQuery } from '../../common/create.query';
import { UsersQueryRepository } from '../infrastructure/users.query.repository';
import { UserCreateInputModel } from './models/user.create.input.model';
import {AdminAuthGuard} from "../../../infrastructure/guards/admin-auth-guard.service";

@Controller('users')
export class UsersController {
  constructor(
    protected userService: UsersService,
    protected usersQueryRepository: UsersQueryRepository,
  ) {}

  @Get()
  async getAll(@Query() query: QueryUsersRequestType) {
    const { sortData, searchData } = createQuery(query);
    return await this.usersQueryRepository.getAllUsers(sortData, searchData);
  }

  @Post()
  @UseGuards(AdminAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createNew(@Body() inputModel: UserCreateInputModel) {
    const newUserId = await this.userService.create(inputModel);
    return await this.usersQueryRepository.getUserById(newUserId);
  }

  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id') id: string) {
    await this.userService.delete(id);
  }
}
