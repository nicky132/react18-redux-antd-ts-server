/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-06-15 12:30:52
 * @LastEditTime: 2022-06-15 12:44:22
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \nest-admin\src\api\admin\dto\login.dto.ts
 */
import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    name: 'username',
    description: '用户名',
    minLength: 2,
    maxLength: 12,
    example: 'hhq',
  })
  @Length(2, 12, { message: '用户名必须在2-12个字符之间' })
  username: string;
  @ApiProperty({
    name: 'password',
    description: '密码',
    minLength: 6,
    maxLength: 12,
    example: '123456',
  })
  @Length(6, 12, { message: '用户名必须在6-32个字符之间' })
  password: string;
}
