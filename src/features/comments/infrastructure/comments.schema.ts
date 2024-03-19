import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comments>;

@Schema()
export class Comments {
  @Prop()
  content: string;

  @Prop()
  postId: string;

  commentatorInfo: { userId: string; userLogin: string };

  @Prop()
  createdAt: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comments);
