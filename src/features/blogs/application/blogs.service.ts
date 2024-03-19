import { BlogsRepository } from '../infrastructure/blogs.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogCreateDto, BlogUpdateDto } from '../types/input';
import { Blog } from '../infrastructure/blogs.schema';
import { blogMapper } from '../types/mapper';

@Injectable()
export class BlogsService {
  constructor(protected blogsRepository: BlogsRepository) {}

  async createNewBlog(inputModel: BlogCreateDto) {
    const createdAt = new Date();

    const newBlogData: Blog = {
      name: inputModel.name,
      description: inputModel.description,
      websiteUrl: inputModel.websiteUrl,
      createdAt: createdAt.toISOString(),
      isMembership: false,
    };

    const newBlogId = await this.blogsRepository.createBlog(newBlogData);
    const newBlog = await this.blogsRepository.getBlogById(newBlogId);
    return blogMapper(newBlog);
  }

  async updateBlog(blogId: string, blogUpdateDto: BlogUpdateDto) {
    const result = await this.blogsRepository.updateBlog(blogId, blogUpdateDto);
  }

  async deleteBlog(blogId: string) {
    await this.blogsRepository.deleteBlog(blogId);
  }
}
