import {Controller, Delete, Get, Param, Put, UseGuards, Post, Req} from '@nestjs/common';
import { CommentsQueryRepository } from '../infrastructure/comments.query.repository';
import {AuthGuard, SoftAuthGuard} from '../../../infrastructure/guards/admin-auth-guard.service';
import {Request} from "express";

@Controller('comments')
export class CommentsController {
  constructor(protected commentsQueryRepository: CommentsQueryRepository) {}

  @Get(':id')
  @UseGuards(SoftAuthGuard)
  async getById(@Param('id') id: string) {
    return this.commentsQueryRepository.getById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async createComment(@Req() req: any,) {
    return req.user
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
