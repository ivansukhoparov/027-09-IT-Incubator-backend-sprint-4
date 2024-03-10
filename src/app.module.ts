import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestingController } from './features/testing/api/testing.controller';
import { UsersController } from './features/users/users.controller';
import { BlogsController } from './features/blogs/api/blogs.controller';
import { PostsController } from './features/posts/api/posts.controller';
import { CommentsController } from './features/comments/comments.controller';
import { AuthController } from './features/auth/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './features/blogs/infrastructure/blogs.schema';
import { appSettings } from './settings/app.settings';
import { UsersService } from './features/users/users.service';
import { UsersRepository } from './features/users/users.repository';
import { BlogsService } from './features/blogs/application/blogs.service';
import { BlogsRepository } from './features/blogs/infrastructure/blogs.repository';
import { BlogsQueryRepository } from './features/blogs/infrastructure/blogs.query.repository';
import { Post, PostSchema } from './features/posts/infrastructure/posts.schema';
import { PostsService } from './features/posts/application/posts.service';
import { PostsRepository } from './features/posts/infrastructure/posts.repository';
import { PostsQueryRepository } from './features/posts/infrastructure/posts.query.repository';
import { TestingRepository } from './features/testing/infrastucture/testing.repository';

const controllers = [
  AuthController,
  UsersController,
  BlogsController,
  PostsController,
  CommentsController,
  TestingController,
];
const services = [UsersService, BlogsService, PostsService];
const repositories = [
  UsersRepository,
  BlogsRepository,
  PostsRepository,
  TestingRepository,
];
const queryRepositories = [BlogsQueryRepository, PostsQueryRepository];

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
    ]),
  ],
  controllers: [AppController, ...controllers],
  providers: [AppService, ...queryRepositories, ...repositories, ...services],
})
export class AppModule {}
