import { success } from 'src/utils/response';
import { error } from './utils/response';
/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-06-12 17:44:52
 * @LastEditTime: 2022-07-05 20:42:40
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \nest-admin\src\app.controller.ts
 */
import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AdminService } from './api/admin/admin.service';
import { RoleService } from './api/role/role.service';
import { UserService } from './api/user/user.service';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly adminService: AdminService,
    private readonly roleService: RoleService,
    private readonly userService: UserService,
  ) {}
  @ApiBearerAuth()
  @ApiOperation({
    summary: '初始化数据',
  })
  @ApiQuery({
    name: 'key',
    description: '初始化数据的key',
    example: '530595274',
  })
  @Get('init')
  async init(@Query('key') key: string) {
    if (key !== '530595274') {
      return error('key错误');
    }
    const admin = await this.adminService.findOne(1);
    if (admin !== null) {
      return error('不可以重复初始化');
    }
    Array(15)
      .fill(0)
      .map((_, i) => {
        this.roleService.create({ name: `role ${i + 1}` });
      });

    this.adminService.create({
      username: 'hhq',
      email: '	530595274@qq.com',
      password: 'e10adc3949ba59abbe56e057f20f883e',
      salt: 'SBszpF',
      roleId: 1,
    });

    Array(50)
      .fill(0)
      .map((_, i) => {
        this.userService.create({
          username: `user-${i + 1}`,
          password: '135508188829',
          email: `135508188829${i}@qq.com`,
          salt: '135508188829',
        });
      });
    return success();
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
