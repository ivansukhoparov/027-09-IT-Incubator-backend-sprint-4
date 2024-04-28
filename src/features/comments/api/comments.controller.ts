import { Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { CommentsQueryRepository } from '../infrastructure/comments.query.repository';
import { AuthGuard } from '../../../infrastructure/guards/admin-auth-guard.service';

@Controller('comments')
export class CommentsController {
  constructor(protected commentsQueryRepository: CommentsQueryRepository) {}

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.commentsQueryRepository.getById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateComment() {}

  @Delete()
  @UseGuards(AuthGuard)
  async deleteComment() {}

  @Put(':id/like-status')
  @UseGuards(AuthGuard)
  async updateLikeStatus() {}
}
