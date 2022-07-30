import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FindPostsDto } from 'src/posts/dto/find-posts.dto';
import { DEFAULT_PAGE_SIZE } from 'src/common/constant';

@Controller('posts')
@UseInterceptors(ClassSerializerInterceptor)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll(@Query() data: FindPostsDto) {
    let page = 0;
    let pageSize = DEFAULT_PAGE_SIZE;
    if (data.page && data.pageSize) {
      page = parseInt(data.page, 10) - 1;
      pageSize = parseInt(data.pageSize, 10);
    }
    return this.postsService.findAll({
      take: pageSize,
      skip: page * pageSize,
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    updatePostDto.updatedAt = new Date();
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
