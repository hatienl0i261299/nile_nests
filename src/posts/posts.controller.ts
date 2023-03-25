import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { FindPostsDto } from 'src/posts/dto/find-posts.dto';
import { DEFAULT_PAGE_SIZE } from 'src/common/constant';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDto } from 'src/posts/dto/create-post.dto';
import { PostsService } from 'src/posts/posts.service';
import { UpdatePostDto } from 'src/posts/dto/update-post.dto';

@Controller('posts')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard('jwt'))
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    create(@Body() createPostDto: CreatePostDto) {
        return this.postsService.create(createPostDto);
    }

    @Get()
    findAll(@Query() data: FindPostsDto) {
        let page = parseInt(data.page, 10) - 1;
        let pageSize = parseInt(data.pageSize, 10);
        if (!page) page = 0;
        if (!pageSize) pageSize = DEFAULT_PAGE_SIZE;
        return this.postsService.findAll({
            take: pageSize,
            skip: page * pageSize,
            orderBy: {
                updatedAt: 'desc'
            }
        });
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.postsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
        updatePostDto.updatedAt = new Date();
        return this.postsService.update(+id, updatePostDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.postsService.remove(id);
    }
}
