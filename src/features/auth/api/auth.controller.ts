import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  UserConfirmationCodeDto,
  UserEmailDto,
  UserLoginDto,
  UserRegistrationDto,
} from '../types/input';
import { AuthService } from '../application/auth.service';
import { UserCreateInputModel } from '../../users/api/models/user.create.input.model';
import { LoginInputModel } from './models/login.input.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  @HttpCode(HttpStatus.NO_CONTENT)
  async registration(@Body() registrationDto: UserCreateInputModel) {
    const isSuccess = await this.authService.registerUser(registrationDto);
    if (isSuccess) return;
  }

  @Post('registration-confirmation')
  @HttpCode(HttpStatus.NO_CONTENT)
  async registrationConfirmation(
    @Body() confirmationCode: UserConfirmationCodeDto,
  ) {
    const isSuccess = await this.authService.confirmEmail(confirmationCode);
    if (isSuccess) return;
  }

  @Post('registration-email-resending')
  @HttpCode(HttpStatus.NO_CONTENT)
  async registrationEmailResending(@Body() resendingRequestDto: UserEmailDto) {
    const isSuccess =
      await this.authService.resendConfirmationCode(resendingRequestDto);
    if (isSuccess) return;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginInputModel) {
    const { accessToken, refreshToken } =
      await this.authService.loginUser(loginDto);
    return accessToken.getModel();
  }
}
