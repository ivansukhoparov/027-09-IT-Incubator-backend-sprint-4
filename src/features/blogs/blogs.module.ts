import { Module, Post } from '@nestjs/common';
import { EmailMessagesManager } from '../../common/email/email.messages.manager';
import { EmailService } from '../../common/email/email.service';
import { NodemailerAdapter } from '../../common/adapters/nodemailer.adaper';
import { JwtTokenAdapter } from '../../common/adapters/jwt.token.adapter';
import { BcryptAdapter } from '../../common/adapters/bcrypt.adapter';
import { IsBlogExistConstraint } from '../../infrastructure/decorators/validate/is.blog.exist';
import { CommentsController } from './comments/api/comments.controller';
import { BlogsController } from './blogs/api/blogs.controller';
import { PostsController } from './posts/api/posts.controller';
import { BlogsService } from './blogs/application/blogs.service';
import { PostsService } from './posts/application/posts.service';
import { CommentsService } from './comments/application/comments.service';
import { CommentsLikesService } from './likes/application/comments.likes.service';
import { PostsLikesService } from './likes/application/posts.likes.service';
import { BlogsRepository } from './blogs/infrastructure/blogs.repository';
import { PostsRepository } from './posts/infrastructure/posts.repository';
import { CommentsRepository } from './comments/infrastructure/comments.repository';
import { CommentsLikesRepository } from './likes/infrastructure/comments.likes.repository';
import { PostsLikesQueryRepository } from './likes/infrastructure/posts.likes.query.repository';
import { PostsLikesRepository } from './likes/infrastructure/posts.likes.repository';
import { BlogsQueryRepository } from './blogs/infrastructure/blogs.query.repository';
import { PostsQueryRepository } from './posts/infrastructure/posts.query.repository';
import { CommentsQueryRepository } from './comments/infrastructure/comments.query.repository';
import { CommentsLikesQueryRepository } from './likes/infrastructure/commets.likes.query.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './blogs/infrastructure/blogs.schema';
import { PostSchema } from './posts/infrastructure/posts.schema';
import {
  Comments,
  CommentSchema,
} from './comments/infrastructure/comments.schema';
import {
  CommentLikes,
  CommentLikesSchema,
  PostsLikes,
  PostsLikesSchema,
} from './likes/infrastructure/likes.schema';

const controllers = [BlogsController, PostsController, CommentsController];

const services = [
  BlogsService,
  PostsService,
  CommentsService,
  CommentsLikesService,
  PostsLikesService,
];

const repositories = [
  BlogsRepository,
  PostsRepository,
  CommentsRepository,
  CommentsLikesRepository,
  PostsLikesQueryRepository,
  PostsLikesRepository,
];

const queryRepositories = [
  BlogsQueryRepository,
  PostsQueryRepository,
  CommentsQueryRepository,
  CommentsLikesQueryRepository,
];

// export const providers = [
//     EmailMessagesManager,
//     EmailService,
//     NodemailerAdapter,
//     JwtTokenAdapter,
//     BcryptAdapter,
//     IsBlogExistConstraint,
// ];

const mongooseImports = [
  MongooseModule.forFeature([
    {
      name: Blog.name,
      schema: BlogSchema,
    },
    {
      name: Post.name,
      schema: PostSchema,
    },
    {
      name: Comments.name,
      schema: CommentSchema,
    },

    {
      name: CommentLikes.name,
      schema: CommentLikesSchema,
    },
    {
      name: PostsLikes.name,
      schema: PostsLikesSchema,
    },
  ]),
];

@Module({
  imports: [...mongooseImports],
  controllers: [...controllers],
  providers: [...services, ...repositories, ...queryRepositories],
  exports: [],
})
export class BlogsModule {}
