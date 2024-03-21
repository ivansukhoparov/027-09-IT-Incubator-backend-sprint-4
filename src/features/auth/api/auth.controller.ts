import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserRegistrationDto } from '../types/input';
import { AuthService } from '../application/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registration')
  @HttpCode(HttpStatus.CREATED)
  async registration(@Body() registrationDto: UserRegistrationDto) {
    const isSuccess = await this.authService.registerUser(registrationDto);
    if (isSuccess) return;
  }
}
