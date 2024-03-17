import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from '../application/users.service';
import {
  QueryUsersRequestType,
  UserCreateInputModelType,
} from '../types/input';
import { createQuery } from '../../common/create.query';
import { UsersQueryRepository } from '../infrastructure/users.query.repository';

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
  @HttpCode(HttpStatus.CREATED)
  async createNew(@Body() inputModel: UserCreateInputModelType) {
    const newUserId = await this.userService.create(inputModel);
    return await this.usersQueryRepository.getUserById(newUserId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id') id: string) {
    await this.userService.delete(id);
  }
}
