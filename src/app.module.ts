import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestingController } from './features/testing/api/testing.controller';
import { UsersController } from './features/users/api/users.controller';
import { BlogsController } from './features/blogs/api/blogs.controller';
import { PostsController } from './features/posts/api/posts.controller';
import { CommentsController } from './features/comments/api/comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './features/blogs/infrastructure/blogs.schema';
import { UsersService } from './features/users/application/users.service';
import { UsersRepository } from './features/users/infrastructure/users.repository';
import { BlogsService } from './features/blogs/application/blogs.service';
import { BlogsRepository } from './features/blogs/infrastructure/blogs.repository';
import { BlogsQueryRepository } from './features/blogs/infrastructure/blogs.query.repository';
import { Post, PostSchema } from './features/posts/infrastructure/posts.schema';
import { PostsService } from './features/posts/application/posts.service';
import { PostsRepository } from './features/posts/infrastructure/posts.repository';
import { PostsQueryRepository } from './features/posts/infrastructure/posts.query.repository';
import { TestingRepository } from './features/testing/infrastucture/testing.repository';
import { TestingService } from './features/testing/application/testing.service';
import { CommentsQueryRepository } from './features/comments/infrastructure/comments.query.repository';
import {
  Comments,
  CommentSchema,
} from './features/comments/infrastructure/comments.schema';
import { User, UserSchema } from './features/users/infrastructure/users.schema';
import { UsersQueryRepository } from './features/users/infrastructure/users.query.repository';
import { EmailService } from './common/email/email.service';
import { EmailMessagesManager } from './common/email/email.messages.manager';
import { NodemailerAdapter } from './common/adapters/nodemailer.adaper';
import { JwtTokenAdapter } from './common/adapters/jwt.token.adapter';
import { BcryptAdapter } from './common/adapters/bcrypt.adapter';
import { appSettings } from './settings/app.settings';
import { AuthController } from './features/auth/api/auth.controller';
import { AuthService } from './features/auth/application/auth.service';
import {CommentsService} from "./features/comments/application/comments.service";
import {CommentsRepository} from "./features/comments/infrastructure/comments.repository";
import {
  CommentLikes,
  CommentLikesSchema,
  PostsLikes,
  PostsLikesSchema
} from "./features/likes/infrastructure/likes.schema";
import {CommentsLikesRepository} from "./features/likes/infrastructure/comments.likes.repository";
import {CommentsLikesService} from "./features/likes/application/comments.likes.service";
import {CommentsLikesQueryRepository} from "./features/likes/infrastructure/commets.likes.query.repository";
import {AuthGuard,} from "./infrastructure/guards/admin-auth-guard.service";
import {PostsLikesService} from "./features/likes/application/posts.likes.service";
import {PostsLikesQueryRepository} from "./features/likes/infrastructure/posts.likes.query.repository";
import {PostsLikesRepository} from "./features/likes/infrastructure/posts.likes.repository";
import {IsBlogExistConstraint} from "./infrastructure/decorators/validate/is.blog.exist";
import {ThrottlerModule} from "@nestjs/throttler";
import {RefreshTokenBlackList, RefreshTokenBlackListSchema} from "./features/auth/infrastructure/auth.schema";
import {AuthRepository} from "./features/auth/infrastructure/auth.repository";

const controllers = [
  AuthController,
  UsersController,
  BlogsController,
  PostsController,
  CommentsController,
  TestingController,
];
const services = [
  AuthService,
  UsersService,
  BlogsService,
  PostsService,
  UsersService,
  TestingService,
  CommentsService,
  CommentsLikesService,
  PostsLikesService,
];
const repositories = [
  UsersRepository,
  BlogsRepository,
  PostsRepository,
  TestingRepository,
  CommentsRepository,
  CommentsLikesRepository,
  PostsLikesQueryRepository,
  PostsLikesRepository,
];
const queryRepositories = [
  AuthRepository,
  UsersQueryRepository,
  BlogsQueryRepository,
  PostsQueryRepository,
  CommentsQueryRepository,
  CommentsLikesQueryRepository,
];
const providers = [
  EmailMessagesManager,
  EmailService,
  NodemailerAdapter,
  JwtTokenAdapter,
  BcryptAdapter,
  IsBlogExistConstraint,
];

@Module({
  imports: [
    MongooseModule.forRoot(
      appSettings.api.MONGO_CONNECTION_URI +
        '/' +
        appSettings.api.MONGO_DB_NAME,
    ),
    ThrottlerModule.forRoot([{
      ttl: 10000,
      limit: 5,
    }]),
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
        name: User.name,
        schema: UserSchema,
      },
      {
        name: CommentLikes.name,
        schema: CommentLikesSchema,
      },
      {
        name: PostsLikes.name,
        schema: PostsLikesSchema,
      },
      {
        name: RefreshTokenBlackList.name,
        schema: RefreshTokenBlackListSchema,
      },

    ]),
  ],
  controllers: [AppController, ...controllers],
  providers: [
    AppService,
    ...queryRepositories,
    ...repositories,
    ...services,
    ...providers,
  ],
})
export class AppModule {}
