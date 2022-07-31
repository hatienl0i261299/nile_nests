import { Module } from '@nestjs/common';
import { PostsService } from 'src/posts/posts.service';
import { PostsController } from 'src/posts/posts.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PrismaService],
})
export class PostsModule {}
