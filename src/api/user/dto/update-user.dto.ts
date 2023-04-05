/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-06-13 20:32:31
 * @LastEditTime: 2022-06-17 11:45:28
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \nest-admin\src\api\user\dto\update-user.dto.ts
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length, ValidateIf } from 'class-validator';

export class UpdateUserDto {
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
    required: false,
  })
  @ValidateIf((o) => {
    return o.password !== '';
  })
  @Length(6, 12, { message: '密码必须在6-32个字符之间' })
  password: string;

  @ApiProperty({
    name: 'email',
    description: '邮箱',
    example: '530595274@qq.com',
  })
  @IsEmail({}, { message: '邮箱格式不合法' })
  email: string;

  salt: string;
}
