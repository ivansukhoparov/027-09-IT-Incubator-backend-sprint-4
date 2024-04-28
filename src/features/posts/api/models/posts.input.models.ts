import { IsStringLength } from '../../../../infrastructure/decorators/validate/is.string.length';
import { IsString } from 'class-validator';

export class CreatePostInputModel {
  @IsStringLength(0, 30)
  title: string;

  @IsStringLength(0, 100)
  shortDescription: string;

  @IsStringLength(0, 1000)
  content: string;

  @IsString()
  blogId: string;
}

export class UpdatePostInputModel extends CreatePostInputModel {}
