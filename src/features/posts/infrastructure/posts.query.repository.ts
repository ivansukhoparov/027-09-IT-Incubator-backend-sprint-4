import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './posts.schema';
import { Model } from 'mongoose';
import { PostOutputDto } from '../types/output';
import { postMapper, PostsLikesInfoType } from '../types/mapper';
import { QuerySortType } from '../../common/types';
import { SORT } from '../../common/common';
import { LikeStatusType } from '../../comments/types/input';
import { BlogsQueryRepository } from '../../blogs/infrastructure/blogs.query.repository';

@Injectable()
export class PostsQueryRepository {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    protected blogsQueryRepository: BlogsQueryRepository,
  ) {}

  async getAllPosts(
    sortData: QuerySortType,
    blogId?: string | null,
    userId?: string | null,
  ) {
    let searchKey = {};

    if (blogId) {
      searchKey = { blogId: blogId };
      await this.blogsQueryRepository.getBlogById(blogId);
    }

    // calculate limits for DB request
    const documentsTotalCount = await this.postModel.countDocuments(searchKey); // Receive total count of blogs
    const pageCount = Math.ceil(documentsTotalCount / +sortData.pageSize); // Calculate total pages count according to page size
    const skippedDocuments = (+sortData.pageNumber - 1) * +sortData.pageSize;

    // Get documents from DB
    const posts = await this.postModel
      .find(searchKey)
      .sort({ [sortData.sortBy]: sortData.sortDirection })
      .skip(+skippedDocuments)
      .limit(+sortData.pageSize)
      .lean();

    const mappedPosts: PostOutputDto[] = [];

    for (let i = 0; i < posts.length; i++) {
      const likes = await this.getLikes(posts[i]._id.toString(), userId);
      mappedPosts.push(postMapper(posts[i], likes));
    }

    return {
      pagesCount: pageCount,
      page: +sortData.pageNumber,
      pageSize: +sortData.pageSize,
      totalCount: documentsTotalCount,
      items: mappedPosts,
    };
  }

  // async getAllPosts(query: any) {
  //   const viewModel = new ViewModel();
  //   const posts = await this.postModel.find({}).lean();
  //
  //   viewModel.totalCount = await this.postModel.countDocuments({}); // Receive total count of blogs
  //   viewModel.pagesCount = Math.ceil(viewModel.totalCount / viewModel.pageSize); // Calculate total pages count according to page size
  //   viewModel.items = [...posts.map(postMapper)];
  //
  //   return viewModel;
  // }

  async getPostById(
    id: string,
    userId: string | null = null,
  ): Promise<PostOutputDto> {
    try {
      const post: PostDocument | null = await this.postModel.findById(id);
      if (!post) throw new NotFoundException();
      const likes = await this.getLikes(id, userId);
      return postMapper(post, likes);
    } catch {
      throw new NotFoundException();
    }
  }

  async getLikes(
    postId: string,
    userId: string | null = null,
  ): Promise<PostsLikesInfoType> {
    const likeStatus: LikeStatusType = 'None';

    // if (userId) {
    //   const userLike = await PostLikeModel.findOne({$and: [{postId: postId}, {likedUserId: userId}]}).lean();
    //   if (userLike) {
    //     likeStatus = userLike.status;
    //   }
    // }
    //
    // const likesCount = await PostLikeModel.countDocuments({$and: [{postId: postId}, {status: "Like"}]});
    // const dislikesCount = await PostLikeModel.countDocuments({$and: [{postId: postId}, {status: "Dislike"}]});
    // const newestLikes: Array<WithId<PostLikeDto>> = await PostLikeModel.find({$and: [{postId: postId}, {status: "Like"}]}).sort({"addedAt": "desc"}).limit(3).lean();

    // return {
    //   likesCount: likesCount,
    //   dislikesCount: dislikesCount,
    //   myStatus: likeStatus,
    //   newestLikes: newestLikes.map(postLikesMapper)
    // };
    return {
      likesCount: 0,
      dislikesCount: 0,
      myStatus: 'None',
      newestLikes: [],
    };
  }
}
