export type PostReqBodyCreateType = {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
};

export type UpdatePostDto = {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
};

export type QueryPostRequestType = {
  sortBy?: PostSortType;
  sortDirection?: 'asc' | 'desc';
  pageNumber?: number;
  pageSize?: number;
};

export type SortPostRepositoryType = {
  sortBy: PostSortType;
  sortDirection: 'asc' | 'desc';
  pageNumber: number;
  pageSize: number;
};

export type PostSortType =
  | 'title'
  | 'shortDescription'
  | 'content'
  | 'blogId'
  | 'blogName'
  | 'createdAt';
