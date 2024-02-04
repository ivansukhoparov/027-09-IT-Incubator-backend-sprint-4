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

@Controller('posts')
export class PostsController {
  constructor() {}

  @Get()
  getAll(@Query() query: { term: string }) {}

  @Get(':id')
  getById(@Param('id') userId: string) {}

  @Get(':id/comments')
  getAllPostComments(@Param('id') userId: string) {}

  @Post()
  createNew(@Body() inputModel: any) {}

  @Post(':id/comments')
  createNewCommentToPost(@Body() inputModel: any) {}

  @Delete(':id')
  deleteById(@Param('id') postId: string) {}

  @Put(':id')
  updateById(@Param('id') postId: string, @Body() inputModel: any) {}
}
