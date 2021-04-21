import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-oauth2';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor() {
    super({
      authorizationURL: ' https://discordapp.com/api/oauth2/authorize?authParams',
      tokenURL: null,
      clientID: null,
      clientSecret: null,
      callbackURL: null,
      scope: null,
    });
  }

  async validate(accessToken: string): Promise<any> {}
}
