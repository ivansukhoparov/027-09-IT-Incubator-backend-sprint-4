import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestingController } from './testing/testing.controller';
import { UsersController } from './users/users.controller';
import { BlogsController } from './blogs/blogs.controller';
import { PostsController } from './posts/posts.controller';
import { CommentsController } from './comments/comments.controller';
import { AuthController } from './auth/auth.controller';

const controllers = [
  AuthController,
  UsersController,
  BlogsController,
  PostsController,
  CommentsController,
  TestingController,
];
const services = [];
const repositories = [];
const queryRepositories = [];

@Module({
  imports: [],
  controllers: [AppController, ...controllers],
  providers: [AppService, ...queryRepositories, ...repositories, ...services],
})
export class AppModule {}
