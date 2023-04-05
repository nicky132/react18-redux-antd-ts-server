import { ApiProperty } from '@nestjs/swagger';

/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-06-15 12:52:01
 * @LastEditTime: 2022-06-15 12:52:03
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \nest-admin\src\api\admin\dto\login-response.dto.ts
 */
export class LoginResponseDto {
  @ApiProperty({
    name: 'token',
    description: '用户token',
  })
  token: string;
}
