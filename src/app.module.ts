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
import { appSettings } from './settings/app.settings';
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

const controllers = [
  UsersController,
  BlogsController,
  PostsController,
  CommentsController,
  TestingController,
];
const services = [UsersService, BlogsService, PostsService, TestingService];
const repositories = [
  UsersRepository,
  BlogsRepository,
  PostsRepository,
  TestingRepository,
  CommentsQueryRepository,
];
const queryRepositories = [
  UsersQueryRepository,
  BlogsQueryRepository,
  PostsQueryRepository,
  CommentsQueryRepository,
];

@Module({
  imports: [
    MongooseModule.forRoot(appSettings.dbUri + '/' + appSettings.dbName),
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
    ]),
  ],
  controllers: [AppController, ...controllers],
  providers: [AppService, ...queryRepositories, ...repositories, ...services],
})
export class AppModule {}
