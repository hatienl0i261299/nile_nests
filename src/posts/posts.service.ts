import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { pagination } from 'src/common/pagination';
import * as _ from 'lodash';
import { PostEntity } from 'src/posts/entities/post.entity';
import { PrismaService } from 'src/prisma.service';
import { UpdatePostDto } from 'src/posts/dto/update-post.dto';

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
                categories: true
            }
        });
        return pagination(
            _.map(posts, (post) => new PostEntity(post)),
            await this.prisma.post.count(),
            take,
            skip / take + 1
        );
    }

    async findOne(id: number) {
        const post = await this.prisma.post.findUnique({
            where: {
                id: id
            },
            include: {
                author: true,
                categories: true
            }
        });
        return new PostEntity(post);
    }

    update(id: number, data: UpdatePostDto) {
        return this.prisma.post.update({
            data,
            where: {
                id
            }
        });
    }

    remove(id: any) {
        return `This action removes a #${id} post`;
    }
}
