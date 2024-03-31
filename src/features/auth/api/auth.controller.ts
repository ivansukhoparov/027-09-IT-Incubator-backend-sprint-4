import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  UserConfirmationCodeDto,
  UserEmailDto,
  UserRegistrationDto,
} from '../types/input';
import { AuthService } from '../application/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  @HttpCode(HttpStatus.NO_CONTENT)
  async registration(@Body() registrationDto: UserRegistrationDto) {
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
}
