/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-03-01 20:38:44
 * @LastEditTime: 2022-06-16 12:10:25
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \nest-admin\src\middleware\auth.middleware.ts
 */
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const auth = req.header('Authorization');
    if (auth) {
      try {
        const result = await this.jwtService.verify(auth.substring(7));
        req.user = {
          name: result.username,
          id: result.id,
        };
        next();
      } catch (e) {
        throw new UnauthorizedException();
      }
    } else {
      throw new UnauthorizedException();
    }
  }
}
