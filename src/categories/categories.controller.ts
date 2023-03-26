import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CategoriesService } from 'src/categories/categories.service';
import { UpdateCategoryDto } from 'src/categories/dto/update-category.dto';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';
import { FindCategoriesDto } from 'src/categories/dto/find-categories.dto';
import { DEFAULT_PAGE_SIZE } from 'src/common/constant';

@Controller('categories')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard('jwt'))
export class CategoriesController {
    constructor(private readonly categoryService: CategoriesService) {}

    @Get()
    findAll(@Query() data: FindCategoriesDto) {
        let page = parseInt(data.page, 10) - 1;
        let pageSize = parseInt(data.pageSize, 10);
        if (!page) page = 0;
        if (!pageSize) pageSize = DEFAULT_PAGE_SIZE;
        return this.categoryService.findAll({
            take: pageSize,
            skip: page * pageSize,
            orderBy: {
                updatedAt: 'desc'
            }
        });
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.categoryService.findOne(+id);
    }

    @Patch(':id')
    updateCategory(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoryService.updateCategory(+id, updateCategoryDto);
    }

    @Post()
    createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.createCategory(createCategoryDto);
    }

    @Delete()
    deleteCategories(@Body() categoryIds: number[]) {
        return this.categoryService.deleteCategories(categoryIds);
    }
}
