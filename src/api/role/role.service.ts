/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-06-13 20:32:41
 * @LastEditTime: 2022-06-14 10:31:35
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \nest-admin\src\api\role\role.service.ts
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private roleModel: typeof Role) {}
  create(createRoleDto: CreateRoleDto) {
    return this.roleModel.create(createRoleDto);
  }
  findByName(name: string) {
    return this.roleModel.findOne({ where: { name } });
  }
  findAll(page = 1, limit = 1, name = '') {
    const where = {};
    if (name) {
      where['name'] = {
        [Op.like]: `%${name}%`,
      };
    }
    return this.roleModel.findAndCountAll({
      where,
      offset: (page - 1) * limit,
      limit,
      order: [['id', 'desc']],
    });
  }

  findOne(id: number) {
    return this.roleModel.findByPk(id);
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.roleModel.update(updateRoleDto, { where: { id } });
  }

  remove(id: number) {
    return this.roleModel.destroy({ where: { id } });
  }
}
