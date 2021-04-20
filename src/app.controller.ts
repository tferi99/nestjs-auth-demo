import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth-guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('/auth/login/basic1')
  async loginBasic1(@Request() req) {
    console.log('Authenticated with loginBasic1: ' + req.user.username);
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/auth/login/basic2')
  async loginBasic2(@Request() req) {
    console.log('Authenticated with loginBasic2: ' + req.user.username);
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login/jwt')
  async loginJwt(@Request() req) {
    console.log('Authenticated with loginJwt: ' + req.user.username);
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return {
      description: 'protected resource',
      user: req.user,
    };
  }
}
