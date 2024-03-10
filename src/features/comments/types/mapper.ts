import { WithId } from 'mongodb';
import { CommentOutputDto, CommentType } from './output';

export const commentMapper = (
  input: WithId<CommentType>,
  // likes: LikesInfoType,
): CommentOutputDto => {
  return {
    id: input._id.toString(),
    content: input.content,
    commentatorInfo: {
      userId: input.commentatorInfo.userId,
      userLogin: input.commentatorInfo.userLogin,
    },
    createdAt: input.createdAt,
    // likesInfo: likes,
  };
};
