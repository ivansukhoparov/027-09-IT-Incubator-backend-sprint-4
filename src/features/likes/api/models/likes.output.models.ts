import { LikeStatusType } from '../../types/input';
import { CONTAINS, Contains, EQUALS, IsIn } from 'class-validator';
import { Prop } from '@nestjs/mongoose';

export class BaseOutputLikesModel {}

export class CommentsLikesOutputModel extends BaseOutputLikesModel {
  likesCount: number;
  dislikesCount: number;
  myStatus: LikeStatusType;
}

export class PostsLikesOutputModel extends BaseOutputLikesModel {}
