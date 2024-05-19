import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import {
  QueryDto,
  QueryRequestType,
  QuerySearchType,
  QuerySortType,
} from '../../common/types';
import { userMapper, userMeMapper } from '../types/mapper';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from '../infrastructure/users.schema';
import { UsersQueryRepository } from '../infrastructure/users.query.repository';

export class GetAllUsersQuery {
  public searchData: QuerySearchType = {};
  public sortData: QuerySortType;

  constructor(query: QueryRequestType) {
    this.sortData = {
      sortBy: query.sortBy ? query.sortBy : 'createdAt',
      sortDirection: query.sortDirection ? query.sortDirection : 'desc',
      pageNumber: query.pageNumber ? query.pageNumber : 1,
      pageSize: query.pageSize ? query.pageSize : 10,
    };

    if (query.searchLoginTerm)
      this.searchData.searchLoginTerm = query.searchLoginTerm;
    if (query.searchEmailTerm)
      this.searchData.searchEmailTerm = query.searchEmailTerm;
    if (query.searchNameTerm)
      this.searchData.searchNameTerm = query.searchNameTerm;
  }
}

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersUseCase implements IQueryHandler<GetAllUsersQuery> {
  constructor(protected usersQueryRepository: UsersQueryRepository) {}

  async execute(query: GetAllUsersQuery) {
    let sortKey = {};
    let searchKey = {};

    // check have search terms create search keys array
    const searchKeysArray: any[] = [];
    if (query.searchData.searchLoginTerm)
      searchKeysArray.push({
        login: { $regex: query.searchData.searchLoginTerm, $options: 'i' },
      });
    if (query.searchData.searchEmailTerm)
      searchKeysArray.push({
        email: { $regex: query.searchData.searchEmailTerm, $options: 'i' },
      });

    if (searchKeysArray.length === 0) {
      searchKey = {};
    } else if (searchKeysArray.length === 1) {
      searchKey = searchKeysArray[0];
    } else if (searchKeysArray.length > 1) {
      searchKey = { $or: searchKeysArray };
    }
    // calculate limits for DB request
    const documentsTotalCount =
      await this.usersQueryRepository.countOfDocuments(searchKey); // Receive total count of blogs
    const pageCount = Math.ceil(documentsTotalCount / +query.sortData.pageSize); // Calculate total pages count according to page size
    const skippedDocuments =
      (+query.sortData.pageNumber - 1) * +query.sortData.pageSize; // Calculate count of skipped docs before requested page

    // check have fields exists assign the same one else assign "createdAt" value
    if (query.sortData.sortBy === 'login')
      sortKey = { login: query.sortData.sortDirection };
    else if (query.sortData.sortBy === 'email')
      sortKey = { email: query.sortData.sortDirection };
    else sortKey = { createdAt: query.sortData.sortDirection };

    // Get documents from DB
    const users = await this.usersQueryRepository.getMany(
      searchKey,
      sortKey,
      +skippedDocuments,
      +query.sortData.pageSize,
    );

    return {
      pagesCount: pageCount,
      page: +query.sortData.pageNumber,
      pageSize: +query.sortData.pageSize,
      totalCount: documentsTotalCount,
      items: users.map(userMapper),
    };
  }
}
