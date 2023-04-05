import { SequelizeModule } from '@nestjs/sequelize';
/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-06-13 20:32:31
 * @LastEditTime: 2022-06-14 16:36:57
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \nest-admin\src\api\user\user.module.ts
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
