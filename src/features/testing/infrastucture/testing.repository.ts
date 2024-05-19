import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from '../../blogs/blogs/infrastructure/blogs.schema';
import { Post } from '../../blogs/posts/infrastructure/posts.schema';
import { User } from '../../users/infrastructure/users.schema';
import { Comments } from '../../blogs/comments/infrastructure/comments.schema';
import {
  CommentLikes,
  PostsLikes,
} from '../../blogs/likes/infrastructure/likes.schema';

@Injectable()
export class TestingRepository {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Comments.name) private commentsModel: Model<Comments>,
    @InjectModel(PostsLikes.name) private postsLikesModel: Model<PostsLikes>,
    @InjectModel(CommentLikes.name)
    private commentLikesModel: Model<CommentLikes>,
  ) {}

  // async dropDb() {
  //   try {
  //
  //     const db = appSettings.dbUri + '/' + appSettings.dbName;
  //     await mongoose.connect(db); // Connecting to the database.
  //     await mongoose.connection.db.dropDatabase();
  //   } catch {
  //     console.log('DB dropping does failed');
  //     throw new Error('DB dropping did fail');
  //   }
  // }

  async deleteAll() {
    try {
      await this.blogModel.deleteMany();
      await this.postModel.deleteMany();
      await this.userModel.deleteMany();
      await this.commentsModel.deleteMany();
      await this.postsLikesModel.deleteMany();
      await this.commentLikesModel.deleteMany();
    } catch {
      console.log('Delete all did fail');
      throw new Error('Delete all did fail');
    }
  }
}
