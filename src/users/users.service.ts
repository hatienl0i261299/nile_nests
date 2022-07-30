import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as _ from 'lodash';
import { pagination } from 'src/common/pagination';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async user(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        posts: true,
      },
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    const users = await this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        posts: true,
      },
    });
    return pagination(
      _.map(users, (user) => new UserEntity(user)),
      await this.prisma.user.count(),
      take,
      skip / take + 1,
    );
  }

  async createUser(data: CreateUserDto) {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(id: string, data: UpdateUserDto) {
    return this.prisma.user.update({
      data,
      where: {
        id,
      },
    });
  }

  async deleteUser(userIds: string[]) {
    return this.prisma.user.deleteMany({
      where: {
        id: {
          in: userIds,
        },
      },
    });
  }
}
