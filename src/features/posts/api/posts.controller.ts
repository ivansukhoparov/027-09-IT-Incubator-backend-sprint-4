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

@Controller('posts')
export class PostsController {
  constructor(
    protected postsService: PostsService,
    protected postQueryRepository: PostsQueryRepository,
  ) {}

  @Get()
  async getAllPosts(@Query() query: { term: string }) {
    return await this.postQueryRepository.getAllPosts(query);
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    return await this.postQueryRepository.getPostById(id);
  }

  @Get(':id/comments')
  async getAllPostComments(@Param('id') id: string) {}

  @Post()
  async createNewPost(@Body() inputModel: any) {
    return await this.postsService.createNewPost(inputModel);
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
