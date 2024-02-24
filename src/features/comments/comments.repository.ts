import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentsRepository {
  findUsers(term: string) {
    return [
      { id: 1, name: 'gogg' },
      { id: 2, name: 'ivan' },
      { id: 3, name: 'goja' },
      { id: 5, name: 'pojo' },
    ].filter((u) => !term || u.name.indexOf(term) > -1);
  }
}
