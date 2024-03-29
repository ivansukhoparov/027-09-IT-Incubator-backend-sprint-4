import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BlogsService } from '../application/blogs.service';
import { BlogCreateDto } from '../types/input';
import { BlogsQueryRepository } from '../infrastructure/blogs.query.repository';
import { createQuery } from '../../common/create.query';
import { QueryUsersRequestType } from '../../users/types/input';
import { PostsService } from '../../posts/application/posts.service';
import { PostsQueryRepository } from '../../posts/infrastructure/posts.query.repository';
import { PostCreateDto } from '../../posts/types/input';

@Controller('blogs')
export class BlogsController {
  constructor(
    protected blogsService: BlogsService,
    protected blogsQueryRepository: BlogsQueryRepository,
    protected postsService: PostsService,
    protected postsQueryRepository: PostsQueryRepository,
  ) {}

  @Get()
  async getAll(@Query() query: QueryUsersRequestType) {
    const { sortData, searchData } = createQuery(query);
    return await this.blogsQueryRepository.getAllBlogs(sortData, searchData);
  }

  @Get(':id')
  async getById(@Param('id') userId: string) {
    return await this.blogsQueryRepository.getBlogById(userId);
  }

  @Get(':id/posts')
  async getAllBlogPosts(
    @Param('id') id: string,
    @Query() query: QueryUsersRequestType,
  ) {
    const { sortData, searchData } = createQuery(query);
    return await this.postsQueryRepository.getAllPosts(sortData, id);
  }

  @Post()
  async createNew(@Body() inputModel: BlogCreateDto) {
    return await this.blogsService.createNewBlog(inputModel);
  }

  @Post(':id/posts')
  @HttpCode(HttpStatus.CREATED)
  async createPostToBlog(@Param('id') id: string, @Body() inputModel: any) {
    const PostCreateDto: PostCreateDto = {
      title: inputModel.title,
      shortDescription: inputModel.shortDescription,
      content: inputModel.content,
      blogId: id,
    };
    const newPostId = await this.postsService.createNewPost(PostCreateDto);
    return await this.postsQueryRepository.getPostById(newPostId);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateById(@Param('id') id: string, @Body() inputModel: any) {
    await this.blogsService.updateBlog(id, inputModel);
    return;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id') userId: string) {
    return await this.blogsService.deleteBlog(userId);
  }
}
