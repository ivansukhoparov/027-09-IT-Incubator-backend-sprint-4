import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('comments')
export class CommentsController {
  constructor() {}

  @Get(':id')
  getById(@Param('id') userId: string) {}

  @Delete(':id')
  deleteById(@Param('id') userId: string) {}

  @Put(':id')
  updateById(@Param('id') userId: string, @Body() inputModel: any) {}
}
