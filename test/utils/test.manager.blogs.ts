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

  createMany = async (numberOfBlogs: number) => {
    const blogs: Array<BlogOutputType> = [];

    for (let i = 1; i <= numberOfBlogs; i++) {
      const createBlogData = {
        name: 'Blog_' + i,
        description: 'some valid description',
        websiteUrl: 'http://www.validurl.com',
      };

      const res = await this.createOne(createBlogData);

      blogs.push(res.body);
    }
    return blogs;
  };

  async createOne(createBlogDto: any) {
    return await request(this.app.getHttpServer())
      .post('/blogs/')
      .auth(this.accessData.value, this.accessData.options)
      .send(createBlogDto);
  }

  async updateOne(updateBlogDto: any, blogId: string) {
    return await request(this.app.getHttpServer())
      .put('/blogs/' + blogId)
      .auth(this.accessData.value, this.accessData.options)
      .send(updateBlogDto);
  }

  async getOne(blogId: string) {
    return await request(this.app.getHttpServer()).get('/blogs/' + blogId);
  }

  async getAll() {
    return await request(this.app.getHttpServer()).get('/blogs/');
  }

  async deleteOne(blogId: string) {
    return await request(this.app.getHttpServer()).delete('/blogs/' + blogId);
  }
}
