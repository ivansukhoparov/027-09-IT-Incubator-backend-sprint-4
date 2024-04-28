import { Injectable, NotFoundException } from '@nestjs/common';
import { PostsRepository } from '../infrastructure/posts.repository';
import { BlogsRepository } from '../../blogs/infrastructure/blogs.repository';
import { PostCreateDto, PostUpdateDto } from '../types/input';
import { Post } from '../infrastructure/posts.schema';
import { postMapper } from '../types/mapper';
import { BlogDocument } from '../../blogs/infrastructure/blogs.schema';
import {
  CreatePostInputModel,
  UpdatePostInputModel,
} from '../api/models/posts.input.models';

@Injectable()
export class PostsService {
  constructor(
    protected postsRepository: PostsRepository,
    protected blogsRepository: BlogsRepository,
  ) {}

  async createNewPost(CreatePostInputModel: CreatePostInputModel) {
    const createdAt = new Date();

    const parentBlog: BlogDocument = await this.blogsRepository.getBlogById(
      CreatePostInputModel.blogId,
    );

    if (!parentBlog) throw new NotFoundException();

    const newPostDto: Post = {
      title: CreatePostInputModel.title,
      shortDescription: CreatePostInputModel.shortDescription,
      content: CreatePostInputModel.content,
      blogId: CreatePostInputModel.blogId,
      blogName: parentBlog.name,
      createdAt: createdAt.toISOString(),
    };

    const newPostId = await this.postsRepository.createPost(newPostDto);
    return newPostId;
  }

  async updatePost(id: string, updateDto: UpdatePostInputModel) {
    await this.postsRepository.updatePost(id, updateDto);
  }

  async deletePost(id: string) {
    await this.postsRepository.deletePost(id);
  }
}
