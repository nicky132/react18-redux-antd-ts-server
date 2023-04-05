/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-06-13 20:32:41
 * @LastEditTime: 2022-06-14 10:08:57
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \nest-admin\src\api\role\entities\role.entity.ts
 */
import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  timestamps: true,
  paranoid: true,
})
export class Role extends Model<Role> {
  @ApiProperty({
    name: 'name',
    description: '角色名称',
  })
  @Column
  name: string;

  @ApiProperty({
    name: 'status',
    description: '角色状态',
    enum: ['0：禁用', '1：正常'],
  })
  @Column({ type: DataType.CHAR(1) })
  status: string;
}
