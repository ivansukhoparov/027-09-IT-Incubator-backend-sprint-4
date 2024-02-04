import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Get('/me')
  getUserInfo() {}

  @Post('/login')
  createNew(@Body() inputModel: any) {}
}
