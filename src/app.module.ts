import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestingController } from './features/testing/testing.controller';
import { UsersController } from './features/users/users.controller';
import { BlogsController } from './features/blogs/blogs.controller';
import { PostsController } from './features/posts/posts.controller';
import { CommentsController } from './features/comments/comments.controller';
import { AuthController } from './features/auth/auth.controller';

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
