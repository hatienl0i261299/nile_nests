import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DEFAULT_PAGE_SIZE } from '../../common/constant';
import { FindUsersDto } from './dto/find-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  findAll(@Query() data: FindUsersDto) {
    console.log(data);
    // {
    //   take: data.pageSize,
    //     skip: data.pageSize * data.page,
    // }
    const page = parseInt(data.page, 10);
    const pageSize = parseInt(data.pageSize, 10);
    return this.usersService.users({
      take: pageSize,
      skip: page * pageSize,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.user(id);
  }

  @Delete()
  bulkDelete(@Body() userIds: string[]) {
    return this.usersService.deleteUser(userIds);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }
}
