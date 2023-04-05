/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-06-13 20:21:10
 * @LastEditTime: 2022-06-15 12:35:37
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \nest-admin\src\api\admin\entities\admin.entity.ts
 */
import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from 'src/api/role/entities/role.entity';

@Table({
  timestamps: true,
  paranoid: true,
})
export class Admin extends Model<Admin> {
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

  @ApiProperty({ name: 'roleId', description: '角色id' })
  @ForeignKey(() => Role)
  @Column
  roleId: number;

  @ApiProperty({ name: 'role', description: '角色', required: false })
  @BelongsTo(() => Role)
  role: Role;
}
