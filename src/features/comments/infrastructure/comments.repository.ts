import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommentDocument, Comments } from './comments.schema';
import { Model } from 'mongoose';
import { commentMapper } from '../types/mapper';
import { ObjectId } from 'mongodb';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectModel(Comments.name) private commentModel: Model<Comments>,
  ) {}

  async createComment(commentDto: Comments):Promise<string> {
      const newComment = await this.commentModel.create(commentDto);
      return newComment._id.toString();
  }

  async updateComment(id: string, updateDto: Comments) {
    try {
      const isUpdate = await this.commentModel.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateDto },
      );
      return true;
    } catch {
      throw new Error();
    }
  }
}
