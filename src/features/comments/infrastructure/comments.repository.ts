import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommentDocument, Comments } from './comments.schema';
import { Model } from 'mongoose';
import { commentMapper } from '../types/mapper';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectModel(Comments.name) private commentModel: Model<Comments>,
  ) {}

  async createComment(commentDto: Comments) {
    const newComment = await this.commentModel.create(commentDto);
    return newComment._id.toString();
  }
}
