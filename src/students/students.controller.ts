import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { StudentsService } from 'src/students/students.service';
import { CreateStudentDto } from 'src/students/dto/create-student.dto';
import { AuthGuard } from '@nestjs/passport';
import { FindStudentsDto } from 'src/students/dto/find-students.dto';
import { DEFAULT_PAGE_SIZE } from 'src/common/constant';

@Controller('students')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard('jwt'))
export class StudentsController {
    constructor(private readonly studentService: StudentsService) {}

    @Get()
    findAll(@Query() data: FindStudentsDto) {
        let page = parseInt(data.page, 10) - 1;
        let pageSize = parseInt(data.pageSize, 10);
        if (!page) page = 0;
        if (!pageSize) pageSize = DEFAULT_PAGE_SIZE;
        return this.studentService.findAll({
            take: pageSize,
            skip: page * pageSize,
            orderBy: {
                updatedAt: 'desc'
            }
        });
    }

    @Post()
    createStudent(@Body() data: CreateStudentDto) {
        return this.studentService.createStudent(data);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.studentService.findOne(id);
    }

    @Delete()
    deleteStudents(@Body() studentIds: string[]) {
        return this.studentService.deleteStudents(studentIds);
    }
}
