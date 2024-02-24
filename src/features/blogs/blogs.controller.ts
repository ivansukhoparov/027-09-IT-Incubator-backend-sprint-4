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

@Controller('blogs')
export class BlogsController {
  constructor() {}

  @Get()
  getAll(@Query() query: { term: string }) {}

  @Get(':id')
  getById(@Param('id') userId: string) {}

  @Get(':id/posts')
  getAllBlogPosts(@Param('id') userId: string) {}

  @Post()
  createNew(@Body() inputModel: any) {}

  @Post(':id/posts')
  createPostToBlog(@Body() inputModel: any) {}

  @Delete(':id')
  deleteById(@Param('id') userId: string) {}

  @Put(':id')
  updateById(@Param('id') userId: string, @Body() inputModel: any) {}
}
