/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-06-13 20:21:10
 * @LastEditTime: 2022-06-14 13:27:03
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \nest-admin\src\api\admin\dto\create-admin.dto.ts
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, Length, Min } from 'class-validator';

export class CreateAdminDto {
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

  @ApiProperty({
    name: 'email',
    description: '邮箱',
    example: '530595274@qq.com',
  })
  @IsEmail({}, { message: '邮箱格式不合法' })
  email: string;

  @ApiProperty({
    name: 'roleId',
    description: '角色id',
    example: 1,
  })
  @Min(1, { message: 'roleId必须为正整数' })
  @IsInt({ message: 'roleId必须为正整数' })
  roleId: number;

  salt: string;
}
