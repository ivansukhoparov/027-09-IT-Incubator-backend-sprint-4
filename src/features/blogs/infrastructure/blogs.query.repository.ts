import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './blogs.schema';
import { Model } from 'mongoose';
import { BlogOutputType } from '../types/output';
import { blogMapper } from '../types/mapper';
import { ViewModel } from '../../common/view.model';
import { NotFoundError } from 'rxjs';

@Injectable()
export class BlogsQueryRepository {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async getAllBlogs(query: any) {
    const viewModel = new ViewModel();
    const blogs = await this.blogModel.find({}).lean();

    viewModel.totalCount = await this.blogModel.countDocuments({}); // Receive total count of blogs
    viewModel.pagesCount = Math.ceil(viewModel.totalCount / viewModel.pageSize); // Calculate total pages count according to page size
    viewModel.items = [...blogs.map(blogMapper)];

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

  async getBlogById(blogId: string): Promise<BlogOutputType> {
    try {
      const blog: BlogDocument = await this.blogModel.findById(blogId);
      if (!blog) throw new NotFoundException();
      return blogMapper(blog);
    } catch {
      throw new NotFoundException();
    }
  }
}
