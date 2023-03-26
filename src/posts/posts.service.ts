import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { pagination } from 'src/common/pagination';
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
        cursor?: Prisma.PostWhereUniqueInput;
        where?: Prisma.PostWhereInput;
        orderBy?: Prisma.PostOrderByWithRelationInput;
    }) {
        return pagination<Prisma.PostDelegate<any>>(
            this.prisma,
            this.prisma.post,
            {
                ...params,
                include: {
                    author: true,
                    categories: {
                        include: {
                            category: true
                        }
                    }
                }
            },
            PostEntity
        );
    }

    async findOne(id: number) {
        const post = await this.prisma.post.findUnique({
            where: {
                id: id
            },
            include: {
                author: true,
                categories: {
                    include: {
                        category: true
                    }
                }
            }
        });
        return new PostEntity(post);
    }

    update(id: number, data: UpdatePostDto) {
        return this.prisma.post.update({
            data: {
                ...data,
                updatedAt: new Date()
            },
            where: {
                id
            }
        });
    }

    remove(id: any) {
        return `This action removes a #${id} post`;
    }
}
