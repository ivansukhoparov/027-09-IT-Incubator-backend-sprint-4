import { Injectable } from '@nestjs/common';
import { PostsRepository } from '../infrastructure/posts.repository';
import { BlogsRepository } from '../../blogs/infrastructure/blogs.repository';
import { BlogCreateDto, BlogUpdateDto } from '../../blogs/types/input';
import { Blog } from '../../blogs/infrastructure/blogs.schema';
import { blogMapper } from '../../blogs/types/mapper';
import { PostCreateDto, PostUpdateDto } from '../types/input';
import { Post } from '../infrastructure/posts.schema';
import { postMapper } from '../types/mapper';

@Injectable()
export class PostsService {
  constructor(
    protected postsRepository: PostsRepository,
    protected blogsRepository: BlogsRepository,
  ) {}

  async createNewPost(inputModel: PostCreateDto) {
    const createdAt = new Date();

    const parentBlog = await this.blogsRepository.getBlogById(
      inputModel.blogId,
    );

    const newPostDto: Post = {
      title: inputModel.title,
      shortDescription: inputModel.shortDescription,
      content: inputModel.content,
      blogId: inputModel.blogId,
      blogName: parentBlog.name,
      createdAt: createdAt.toISOString(),
    };

    const newPostId = await this.postsRepository.createPost(newPostDto);
    const newPost = await this.postsRepository.getPostById(newPostId);
    return postMapper(newPost);
  }

  async updatePost(id: string, updateDto: PostUpdateDto) {
    await this.postsRepository.updatePost(id, updateDto);
  }

  async deletePost(id: string) {
    await this.postsRepository.deletePost(id);
  }
}
