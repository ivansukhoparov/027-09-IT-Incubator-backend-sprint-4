import { WithId } from 'mongodb';
import { PostType, PostOutputDto } from './output';

export const postMapper = (post: WithId<PostType>): PostOutputDto => {
  return {
    id: post._id.toString(),
    title: post.title,
    shortDescription: post.shortDescription,
    content: post.content,
    blogId: post.blogId,
    blogName: post.blogName,
    createdAt: post.createdAt,
  };
};
