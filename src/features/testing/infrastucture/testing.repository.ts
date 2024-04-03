import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from '../../blogs/infrastructure/blogs.schema';
import { Post } from '../../posts/infrastructure/posts.schema';
import { appSettings } from '../../../settings/app.settings';
import { User } from '../../users/infrastructure/users.schema';

@Injectable()
export class TestingRepository {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
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
    } catch {
      console.log('Delete all did fail');
      throw new Error('Delete all did fail');
    }
  }
}
