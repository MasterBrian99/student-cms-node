import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';

import { ContextProvider } from 'src/providers/context.provider';
import { User } from 'src/schema/schemas/user.schema';

@Injectable()
export class AuthUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();

    const user = request.user as User;
    ContextProvider.setAuthUser(user);

    return next.handle();
  }
}
