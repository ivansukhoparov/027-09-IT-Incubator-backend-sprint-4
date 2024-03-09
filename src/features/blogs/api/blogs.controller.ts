import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BlogsService } from '../application/blogs.service';
import { BlogCreateDto } from '../types/input';
import { BlogsQueryRepository } from '../infrastructure/blogs.query.repository';

@Controller('blogs')
export class BlogsController {
  constructor(
    protected blogsService: BlogsService,
    protected blogsQueryRepository: BlogsQueryRepository,
  ) {}

  @Get()
  async getAll(@Query() query: { term: string }) {
    return await this.blogsQueryRepository.getAllBlogs(query);
  }

  @Get(':id')
  async getById(@Param('id') userId: string) {
    return await this.blogsQueryRepository.getBlogById(userId);
  }

  @Get(':id/posts')
  getAllBlogPosts(@Param('id') userId: string) {}

  @Post()
  async createNew(@Body() inputModel: BlogCreateDto) {
    return await this.blogsService.createNewBlog(inputModel);
  }

  @Post(':id/posts')
  createPostToBlog(@Body() inputModel: any) {}

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateById(@Param('id') userId: string, @Body() inputModel: any) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id') userId: string) {
    return await this.blogsService.deleteBlog(userId);
  }
}
