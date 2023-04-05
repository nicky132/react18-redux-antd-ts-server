/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-06-13 20:32:41
 * @LastEditTime: 2022-06-14 12:16:15
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \nest-admin\src\api\role\role.module.ts
 */
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role } from './entities/role.entity';

@Module({
  imports: [SequelizeModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
