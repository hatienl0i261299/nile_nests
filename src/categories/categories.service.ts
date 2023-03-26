import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateCategoryDto } from 'src/categories/dto/update-category.dto';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { Prisma } from '@prisma/client';
import { pagination } from 'src/common/pagination';

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService) {}

    async findAll(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }) {
        return pagination<Prisma.CategoryDelegate<any>>(this.prisma, this.prisma.category, params, CategoryEntity);
    }

    async findOne(id: number) {
        const category = await this.prisma.category.findUniqueOrThrow({
            where: {
                id
            }
        });
        return new CategoryEntity(category);
    }

    async createCategory(data: CreateCategoryDto) {
        const category = await this.prisma.category.create({
            data
        });
        return new CategoryEntity(category);
    }

    async updateCategory(id: number, data: UpdateCategoryDto) {
        const category = await this.prisma.category.update({
            data: {
                ...data,
                updatedAt: new Date()
            },
            where: {
                id
            }
        });
        return new CategoryEntity(category);
    }

    async deleteCategories(categoryIds: number[]) {
        return this.prisma.category.deleteMany({
            where: {
                id: {
                    in: categoryIds
                }
            }
        });
    }
}
