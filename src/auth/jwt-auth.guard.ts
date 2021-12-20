import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {


    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    const ret = super.canActivate(context);
    console.log('--> JwtAuthGuard: ', ret);
    return ret;
  }
}
