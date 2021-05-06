import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';

/**
 * Just for testing multiple 'local' strategies.
 *
 * 'Strategy' imported from 'passport-local'.
 */
@Injectable()
export class DummyStrategy extends PassportStrategy(Strategy, 'dummy') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log(`DummyStrategy.validate(username:${username}, password:${password})`);

    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
