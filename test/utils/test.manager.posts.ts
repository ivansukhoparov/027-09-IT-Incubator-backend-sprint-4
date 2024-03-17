import { BlogOutputDto } from '../../src/features/blogs/types/output';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PostOutputDto } from '../../src/features/posts/types/output';

export class PostsTestManager {
  private endPoint: string = '/posts/';
  constructor(
    protected readonly app: INestApplication,
    private accessData: any = {
      value: '',
      options: { type: 'basic' },
    },
  ) {}

  createMany = async (numberOfEntities: number, parentId: string) => {
    const posts: Array<PostOutputDto> = [];

    for (let i = 1; i <= numberOfEntities; i++) {
      const createPostData = {
        title: 'Post_title_' + i,
        shortDescription: 'a very short description',
        content: 'some content',
        blogId: parentId,
      };

      const res = await this.createOne(createPostData);

      posts.push(res.body);
    }
    return posts;
  };

  async createOne(createPostDto: any) {
    return await request(this.app.getHttpServer())
      .post(this.endPoint)
      .auth(this.accessData.value, this.accessData.options)
      .send(createPostDto);
  }

  async updateOne(updatePostDto: any, id: string) {
    return await request(this.app.getHttpServer())
      .put(this.endPoint + id)
      .auth(this.accessData.value, this.accessData.options)
      .send(updatePostDto);
  }

  async getOne(id: string) {
    return await request(this.app.getHttpServer()).get(this.endPoint + id);
  }

  async getAll() {
    return await request(this.app.getHttpServer()).get(this.endPoint);
  }

  async deleteOne(id: string) {
    return await request(this.app.getHttpServer()).delete(this.endPoint + id);
  }
}
