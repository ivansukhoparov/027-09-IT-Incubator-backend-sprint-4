import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestingController } from './features/testing/testing.controller';
import { UsersController } from './features/users/users.controller';
import { BlogsController } from './features/blogs/api/blogs.controller';
import { PostsController } from './features/posts/posts.controller';
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
import { ViewModel } from './features/common/view.model';

const controllers = [
  AuthController,
  UsersController,
  BlogsController,
  PostsController,
  CommentsController,
  TestingController,
];
const services = [UsersService, BlogsService];
const repositories = [UsersRepository, BlogsRepository];
const queryRepositories = [BlogsQueryRepository];

@Module({
  imports: [
    MongooseModule.forRoot(appSettings.dbUri + '/' + appSettings.dbName),
    MongooseModule.forFeature([
      {
        name: Blog.name,
        schema: BlogSchema,
      },
    ]),
  ],
  controllers: [AppController, ...controllers],
  providers: [AppService, ...queryRepositories, ...repositories, ...services],
})
export class AppModule {}
