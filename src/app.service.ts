/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-06-12 17:44:52
 * @LastEditTime: 2022-06-15 11:51:36
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \nest-admin\src\app.service.ts
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
