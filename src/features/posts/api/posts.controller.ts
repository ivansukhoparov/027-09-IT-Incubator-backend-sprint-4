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
import { PostsService } from '../application/posts.service';
import { PostsQueryRepository } from '../infrastructure/posts.query.repository';
import { CommentsQueryRepository } from '../../comments/infrastructure/comments.query.repository';
import { QueryUsersRequestType } from '../../users/types/input';
import { createQuery } from '../../common/create.query';

@Controller('posts')
export class PostsController {
  constructor(
    protected postsService: PostsService,
    protected postsQueryRepository: PostsQueryRepository,
    protected commentsQueryRepository: CommentsQueryRepository,
  ) {}

  @Get()
  async getAllPosts(@Query() query: QueryUsersRequestType) {
    const { sortData, searchData } = createQuery(query);
    return await this.postsQueryRepository.getAllPosts(sortData);
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    return await this.postsQueryRepository.getPostById(id);
  }

  @Get(':id/comments')
  async getAllPostComments(@Param('id') id: string) {
    return await this.commentsQueryRepository.getById(id);
  }

  @Post()
  async createNewPost(@Body() inputModel: any) {
    const newPostId = await this.postsService.createNewPost(inputModel);
    return await this.postsQueryRepository.getPostById(newPostId);
  }

  @Post(':id/comments')
  async createNewCommentToPost(@Body() inputModel: any) {}

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateById(@Param('id') id: string, @Body() inputModel: any) {
    await this.postsService.updatePost(id, inputModel);
    return {};
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id') id: string) {
    await this.postsService.deletePost(id);
    return;
  }
}
