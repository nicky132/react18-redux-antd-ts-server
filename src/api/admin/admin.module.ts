/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-06-13 20:21:10
 * @LastEditTime: 2022-06-15 12:49:47
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \nest-admin\src\api\admin\admin.module.ts
 */
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './entities/admin.entity';
import { RoleModule } from '../role/role.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    RoleModule,
    SequelizeModule.forFeature([Admin]),
    JwtModule.register({
      secret: 'jwtConstants.secret',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
