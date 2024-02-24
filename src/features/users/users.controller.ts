import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(protected userService: UsersService) {}

  @Get()
  getAll(@Query() query: { term: string }) {}

  @Post()
  createNew(@Body() inputModel: any) {}

  @Delete(':id')
  deleteById(@Param('id') userId: string) {}
}
