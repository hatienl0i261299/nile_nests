import { Injectable } from '@nestjs/common';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { pagination } from 'src/common/pagination';
import * as _ from 'lodash';
import { PostEntity } from 'src/posts/entities/post.entity';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}
  create(createPostDto: any) {
    return this.prisma.post.create({ data: createPostDto });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    const posts = await this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        author: true,
      },
    });
    return pagination(
      _.map(posts, (post) => new PostEntity(post)),
      await this.prisma.user.count(),
      take,
      skip / take + 1,
    );
  }

  findOne(id: any) {
    return this.prisma.post.findUnique({
      where: {
        id: id,
      },
      include: {
        author: true,
      },
    });
  }

  update(id: string, data: UpdatePostDto) {
    return this.prisma.post.update({
      data,
      where: {
        id,
      },
    });
  }

  remove(id: any) {
    return `This action removes a #${id} post`;
  }
}
