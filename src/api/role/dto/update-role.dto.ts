/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-06-13 20:32:41
 * @LastEditTime: 2022-06-14 11:11:04
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \nest-admin\src\api\role\dto\update-role.dto.ts
 */
import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty({
    name: 'name',
    description: '角色名称',
    minLength: 2,
    maxLength: 12,
    example: 'hhq',
  })
  @Length(2, 12, { message: '角色名称必须在2-12个字符之间' })
  name: string;
}
