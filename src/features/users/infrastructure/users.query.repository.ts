import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Model } from 'mongoose';
import { QuerySearchType, QuerySortType } from '../../common/types';
import { userMapper, userMeMapper } from '../types/mapper';

@Injectable()
export class UsersQueryRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}


  // async getAllUsers(sortData: QuerySortType, searchData: QuerySearchType) {
  //   let sortKey = {};
  //   let searchKey = {};
  //
  //   // check have search terms create search keys array
  //   const searchKeysArray: any[] = [];
  //   if (searchData.searchLoginTerm)
  //     searchKeysArray.push({
  //       login: { $regex: searchData.searchLoginTerm, $options: 'i' },
  //     });
  //   if (searchData.searchEmailTerm)
  //     searchKeysArray.push({
  //       email: { $regex: searchData.searchEmailTerm, $options: 'i' },
  //     });
  //
  //   if (searchKeysArray.length === 0) {
  //     searchKey = {};
  //   } else if (searchKeysArray.length === 1) {
  //     searchKey = searchKeysArray[0];
  //   } else if (searchKeysArray.length > 1) {
  //     searchKey = { $or: searchKeysArray };
  //   }
  //   // calculate limits for DB request
  //   const documentsTotalCount = await this.userModel.countDocuments(searchKey); // Receive total count of blogs
  //   const pageCount = Math.ceil(documentsTotalCount / +sortData.pageSize); // Calculate total pages count according to page size
  //   const skippedDocuments = (+sortData.pageNumber - 1) * +sortData.pageSize; // Calculate count of skipped docs before requested page
  //
  //   // check have fields exists assign the same one else assign "createdAt" value
  //   if (sortData.sortBy === 'login')
  //     sortKey = { login: sortData.sortDirection };
  //   else if (sortData.sortBy === 'email')
  //     sortKey = { email: sortData.sortDirection };
  //   else sortKey = { createdAt: sortData.sortDirection };
  //
  //   // Get documents from DB
  //   const users = await this.userModel
  //     .find(searchKey)
  //     .sort(sortKey)
  //     .skip(+skippedDocuments)
  //     .limit(+sortData.pageSize)
  //     .lean();
  //
  //   return {
  //     pagesCount: pageCount,
  //     page: +sortData.pageNumber,
  //     pageSize: +sortData.pageSize,
  //     totalCount: documentsTotalCount,
  //     items: users.map(userMapper),
  //   };
  // }}




  async getById(id: string) {
    try {
      const user = await this.userModel.findById(id);
      if (!user) throw new NotFoundException();
      return userMapper(user);
    } catch {
      throw new NotFoundException();
    }
  }

  async getUserAuthMe(id: string) {
    try {
      const user = await this.userModel.findById(id);
      if (!user) throw new NotFoundException();
      return userMeMapper(user);
    } catch {
      throw new NotFoundException();
    }
  }
}
