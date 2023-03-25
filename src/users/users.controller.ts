import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FindUsersDto } from 'src/users/dto/find-users.dto';
import { UsersService } from 'src/users/users.service';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { DEFAULT_PAGE_SIZE } from 'src/common/constant';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard('jwt'))
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Get()
    findAll(@Query() data: FindUsersDto) {
        let page = parseInt(data.page, 10) - 1;
        let pageSize = parseInt(data.pageSize, 10);
        if (!page) page = 0;
        if (!pageSize) pageSize = DEFAULT_PAGE_SIZE;
        return this.usersService.users({
            take: pageSize,
            skip: page * pageSize,
            orderBy: {
                updatedAt: 'desc'
            }
        });
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.usersService.user(+id);
    }

    @Delete()
    bulkDelete(@Body() userIds: number[]) {
        return this.usersService.deleteUser(userIds);
    }

    @Patch(':id')
    updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(+id, updateUserDto);
    }
}
