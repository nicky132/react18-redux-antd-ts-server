import { error } from './utils/response';
/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-04-28 13:56:28
 * @LastEditTime: 2022-06-14 01:47:52
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \nest-admin\src\http-exception.filter.ts
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const msg = exception.getResponse();
    const message =
      typeof msg['message'] === 'string' ? msg['message'] : msg['message'][0];
    response.status(status).json(
      error(message, {
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
      }),
    );
  }
}
