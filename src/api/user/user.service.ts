/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-06-13 20:32:31
 * @LastEditTime: 2022-06-14 00:07:21
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \nest-admin\src\api\user\user.service.ts
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModal: typeof User) {}
  create(createUserDto: CreateUserDto) {
    return this.userModal.create(createUserDto);
  }

  findAll(page = 1, limit = 1, username = '') {
    const where = {};
    if (username !== null) {
      where['username'] = {
        [Op.like]: `%${username}%`,
      };
    }
    return this.userModal.findAndCountAll({
      order: [['id', 'desc']],
      offset: (page - 1) * limit,
      limit,
      where,
    });
  }
  findByName(username: string) {
    return this.userModal.findOne({ where: { username } });
  }
  findByEmail(email: string) {
    return this.userModal.findOne({ where: { email } });
  }
  findOne(id: number) {
    return this.userModal.findByPk(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModal.update(updateUserDto, { where: { id } });
  }

  remove(id: number) {
    return this.userModal.destroy({ where: { id } });
  }
}
