import { Controller, Body, Post, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInEmployeeDto } from './dto/sign-in.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin-employee')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInEmployeeDto: SignInEmployeeDto) {
    return this.authService.signInEmployee(signInEmployeeDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getprofile(@Request() req) {
    return req.user;
  }
}