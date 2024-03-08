import { BlogOutputType } from '../../src/features/blogs/types/output';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

export class BlogsTestManager {
  constructor(
    protected readonly app: INestApplication,
    private accessData: any = {
      value: '',
      options: { type: 'basic' },
    },
  ) {}

  createBlogs = async (numberOfBlogs: number) => {
    const blogs: BlogOutputType[] = [];

    for (let i = 1; i <= numberOfBlogs; i++) {
      const createBlogData = {
        name: 'Blog_' + i,
        description: 'some valid description',
        websiteUrl: 'http://www.validurl.com',
      };

      const blog = this.createBlog(createBlogData);

      // blogs.push(blog);
    }
    return blogs;
  };

  async createBlog(createBlogData: any) {
    return await request(this.app.getHttpServer())
      .post('/blogs/')
      .auth(this.accessData.value, this.accessData.options)
      .send(createBlogData);
  }
}
