import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './posts.schema';
import { Model } from 'mongoose';
import { PostOutputDto } from '../types/output';
import { postMapper } from '../types/mapper';
import { ViewModel } from '../../common/view.model';

@Injectable()
export class PostsQueryRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async getAllPosts(query: any) {
    const viewModel = new ViewModel();
    const posts = await this.postModel.find({}).lean();

    viewModel.totalCount = await this.postModel.countDocuments({}); // Receive total count of blogs
    viewModel.pagesCount = Math.ceil(viewModel.totalCount / viewModel.pageSize); // Calculate total pages count according to page size
    viewModel.items = [...posts.map(postMapper)];

    return viewModel;
  }

  // async getAllBlogs(sortData: QuerySortType, searchData: QuerySearchType): Promise<ViewModelType<BlogOutputType>> {
  //     let searchKey = {};
  //
  //     // check if have searchNameTerm create search key
  //     if (searchData.searchNameTerm) searchKey = {name: {$regex: searchData.searchNameTerm, $options: "i"}};
  //
  //     // calculate limits for DB request
  //     const documentsTotalCount = await blogCollection.countDocuments(searchKey); // Receive total count of blogs
  //     const pageCount = Math.ceil(documentsTotalCount / +sortData.pageSize); // Calculate total pages count according to page size
  //     const skippedDocuments = (+sortData.pageNumber - 1) * +sortData.pageSize; // Calculate count of skipped docs before requested page
  //
  //     // Get documents from DB
  //     const blogs: WithId<BlogType>[] = await BlogModel.find(searchKey)
  //         .sort(sortData.sortBy + " " + SORT[sortData.sortDirection])
  //         .skip(+skippedDocuments)
  //         .limit(+sortData.pageSize)
  //         .lean();
  //
  //     return {
  //         pagesCount: pageCount,
  //         page: +sortData.pageNumber,
  //         pageSize: +sortData.pageSize,
  //         totalCount: documentsTotalCount,
  //         items: blogs.map(blogMapper)
  //     };
  // }

  async getPostById(id: string): Promise<PostOutputDto> {
    try {
      const post: PostDocument = await this.postModel.findById(id);
      if (!post) throw new NotFoundException();
      return postMapper(post);
    } catch {
      throw new NotFoundException();
    }
  }
}
