import { IsStringLength } from '../../../../infrastructure/decorators/validate/is.string.length';
import { IsOptionalString } from '../../../../infrastructure/decorators/validate/is.optional.string';

export class LoginInputModel {
  @IsOptionalString()
  loginOrEmail: string;

  @IsStringLength(6, 20)
  password: string;
}
