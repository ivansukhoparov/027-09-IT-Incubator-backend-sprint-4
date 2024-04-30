import { CommentsRepository } from '../infrastructure/comments.repository';
import { Injectable } from '@nestjs/common';
import { UpdateCommentInputModel } from '../api/models/comments.input.models';
import {CommentCreateDto} from "../types/input";
import {Comments} from "../infrastructure/comments.schema";
import {Prop} from "@nestjs/mongoose";

@Injectable()
export class CommentsService {
  constructor(protected commentsRepository: CommentsRepository) {}

  async createComment(createDto:CommentCreateDto):Promise<string>{
    const createdAt = new Date();
    const commentCreateModel: Comments = {
      content: createDto.content,
      postId: createDto.postId,
      commentatorInfo: {
        userId: createDto.userId,
        userLogin: createDto.userLogin,
      },
      createdAt: createdAt.toISOString(),
    }
    return await this.commentsRepository.createComment(commentCreateModel)
  }
  async updateComment(id: string, updateModel: UpdateCommentInputModel) {}
}
