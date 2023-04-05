/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-06-12 17:44:52
 * @LastEditTime: 2022-06-16 23:17:02
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \nest-admin\src\app.module.ts
 */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './api/admin/admin.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './api/user/user.module';
import { RoleModule } from './api/role/role.module';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthMiddleware } from './middleware/auth.middleware';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'ui'),
    }),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      host: 'localhost',
      database: 'nest-admin',
      autoLoadModels: true,
      storage: process.env.USERPROFILE + '/.nest-admin.db',
      // sync: {
      //   alter: true,
      // },
      synchronize: true,
    }),
    JwtModule.register({
      secret: 'jwtConstants.secret',
      signOptions: { expiresIn: '24h' },
    }),
    AdminModule,
    UserModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        '/admin/admin/login',
        // '/admin/product/upload/img',
        // '/admin/product/upload/img/file',
        // '/admin/product/upload/img/list',
        // '/admin/product/upload/video',
      )
      .forRoutes('/admin/*');
  }
}
