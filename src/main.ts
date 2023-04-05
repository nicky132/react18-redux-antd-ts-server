/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-06-12 17:44:52
 * @LastEditTime: 2022-07-18 11:26:39
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \nest-admin\src\main.ts
 */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ResponseMapDto } from './decorator/api.map.response';
import { PaginatedDto } from './decorator/api.paginated.response';
import { HttpExceptionFilter } from './http-exception.filter';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '100mb' }));
  app.setGlobalPrefix('/admin');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('武汉跃码教育--中台系统项目实战API文档')
    .setDescription(
      'nest(nodejs)+mysql开发的后台管理系统 [hhq](https://space.bilibili.com/388985971)',
    )
    .setContact('hhq', '', '530595274@qq.com')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [PaginatedDto, ResponseMapDto],
  });
  SwaggerModule.setup('api', app, document);
  await app.listen(3006);
}
bootstrap();
