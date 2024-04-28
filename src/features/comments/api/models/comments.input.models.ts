import { IsStringLength } from '../../../../infrastructure/decorators/validate/is.string.length';
import { CreatePostInputModel } from '../../../posts/api/models/posts.input.models';

export class CommentCreateInputModel {
  @IsStringLength(20, 300)
  content: string;
}

export class UpdateCommentInputModel extends CommentCreateInputModel {}
