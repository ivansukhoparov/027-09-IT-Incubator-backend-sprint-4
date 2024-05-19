import { IsStringLength } from '../../../../infrastructure/decorators/validate/is.string.length';
import { IsOptionalString } from '../../../../infrastructure/decorators/validate/is.optional.string';
import { IsOptionalEmail } from '../../../../infrastructure/decorators/validate/is.optional.email';

export class LoginInputModel {
  @IsOptionalString()
  loginOrEmail: string;

  @IsOptionalString()
  password: string;
}

export class UserEmailDto {
  @IsOptionalEmail()
  email: string;
}
