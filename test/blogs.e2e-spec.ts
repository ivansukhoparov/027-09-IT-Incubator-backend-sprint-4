import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

import { INestApplication } from '@nestjs/common';
import mongoose from 'mongoose';
import { appSettings } from '../src/settings/app.settings';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogsTestManager } from './utils/create.blogs';

const db = appSettings.dbUri + '/' + appSettings.dbName;
const blogsTestManager = describe('Blogs test', () => {
  let app: INestApplication;
  let blogsTestManager: BlogsTestManager;

  beforeAll(async () => {
    await mongoose.connect(db); // Connecting to the database.

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(db), AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    //Init blogs test manager:
    blogsTestManager = new BlogsTestManager(app);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  // it(' - POST does not create new blog with incorrect data (empty fields)', async () => {});
  //
  // it(' - POST does not create the blog with incorrect data (name and description over length)', async () => {});
  //
  // it(' - POST does not create the blog with incorrect websiteUrl (not url or over length)', async () => {});
  //
  // it(' - POST does not create the blog with invalid authorization', async () => {});
  //
  it(' + POST should be create the blog with correct data', async () => {
    const res = await blogsTestManager.createBlog({
      name: 'Blog_',
      description: 'some valid description',
      websiteUrl: 'http://www.validurl.com',
    });

    console.log(res);
  });
  //
  // it(' - POST should be create the blog with correct data on blogs/id/posts', async () => {});
  //
  // // PUT requests
  // it(' - PUT does not update the blog with incorrect data (no name)', async () => {});
  //
  // it(' - PUT does not update the blog with incorrect data (over length)', async () => {});
  //
  // it(' - PUT does not update the blog with incorrect data (no data but spaces)', async () => {});
  //
  // it(' - PUT does not update the blog with invalid authorization', async () => {});
  //
  // it(' - PUT should update the blog with correct data', async () => {});
  //
  // // GET requests
  // it(' - GET request without ID should return array with length equal 2', async () => {});
  //
  // it(' - GET with invalid ID should return 404', async () => {});
  //
  // it(' - GET with valid ID should return 200 and object', async () => {});
  //
  // it(' - GET request with address /id/posts should return view model with 1 item', async () => {});
  //
  // // DELETE request
  // it(' - delete with invalid ID should return 404', async () => {});
  //
  // it(' - delete with invalid authorization should return 401', async () => {});
  //
  // it(' - delete with valid ID should return 204 and array with length equal 0', async () => {});
});
