/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-06-13 20:32:31
 * @LastEditTime: 2022-06-14 00:14:38
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \nest-admin\src\api\user\entities\user.entity.ts
 */
import { ApiProperty } from '@nestjs/swagger';
import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  timestamps: true,
  paranoid: true,
})
export class User extends Model<User> {
  @ApiProperty({
    name: 'username',
    description: '用户名',
  })
  @Column
  username: string;

  @ApiProperty({
    name: 'email',
    description: '邮箱',
  })
  @Column
  email: string;

  @ApiProperty({
    name: 'password',
    description: '密码',
  })
  @Column
  get password(): string {
    return '';
  }
  set password(val) {
    this.setDataValue('password', val);
  }
  @ApiProperty({ name: 'salt', description: '盐' })
  @Column
  get salt(): string {
    return '';
  }
  set salt(val: string) {
    this.setDataValue('salt', val);
  }
}
