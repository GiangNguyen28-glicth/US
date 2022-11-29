import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SkipThrottle } from '@nestjs/throttler';
import { GoogleGuard } from '../common/guard/google.guard';
import { AuthService } from './auth.service';

@Controller('auth')
@SkipThrottle()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth(@Req() req) {
    console.log(req);
  }

  @Get('/facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  facebookAuthRedirect(@Req() req) {
    return this.authService.loginWithFacebook(req);
  }

  @Get('/google/callback')
  @UseGuards(GoogleGuard)
  googleAuthRedirect(@Req() req) {
    return this.authService.loginWithGoogle(req);
  }

  @Get('/hello')
  hello() {
    return 'Hello';
  }
}
