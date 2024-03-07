import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from '../types/blogs.schema';
import { Model } from 'mongoose';
import { BlogOutputType } from '../types/output';
import { blogMapper } from '../types/mapper';

@Injectable()
export class BlogsQueryRepository {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

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
    const blog: BlogDocument = await this.blogModel.findById(blogId);
    blog.description = 'ssss';
    await blog.save();
    if (!blog) throw new Error();
    return blogMapper(blog);
  }
}
