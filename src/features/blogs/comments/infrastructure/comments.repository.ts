import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommentDocument, Comments } from './comments.schema';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { UpdateCommentInputModel } from '../api/models/comments.input.models';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectModel(Comments.name) private commentModel: Model<Comments>,
  ) {}

  async getCommentById(commentId: string) {
    const comment: CommentDocument =
      await this.commentModel.findById(commentId);
    if (comment) {
      return comment;
    } else {
      throw new NotFoundException();
    }
  }

  async createComment(commentDto: Comments): Promise<string> {
    const newComment = await this.commentModel.create(commentDto);
    return newComment._id.toString();
  }

  async updateComment(id: string, updateDto: UpdateCommentInputModel) {
    try {
      const isUpdate = await this.commentModel.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateDto },
      );
      return true;
    } catch {
      throw new NotFoundException();
    }
  }

  async deleteComment(id: string) {
    try {
      await this.commentModel.deleteOne({ _id: new ObjectId(id) });
      return true;
    } catch {
      throw new NotFoundException();
    }
  }
}
