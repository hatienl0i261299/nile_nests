import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from 'src/students/dto/create-student.dto';
import { PrismaService } from 'src/prisma.service';
import { StudentEntity } from 'src/students/entities/student.entity';
import { Prisma } from '@prisma/client';
import { pagination } from 'src/common/pagination';

@Injectable()
export class StudentsService {
    constructor(private prisma: PrismaService) {}

    private include = {
        countries: {
            include: {
                country: true
            }
        }
    };

    async findAll(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.PostWhereUniqueInput;
        where?: Prisma.PostWhereInput;
        orderBy?: Prisma.PostOrderByWithRelationInput;
    }) {
        return pagination<Prisma.StudentDelegate<any>>(
            this.prisma,
            this.prisma.student,
            {
                ...params,
                include: this.include
            },
            StudentEntity
        );
    }

    async createStudent(data: CreateStudentDto) {
        const { countries, ...otherData } = data;
        const student = await this.prisma.student.create({
            data: {
                ...otherData,
                countries: {
                    create: countries.map((countryId) => ({
                        country: {
                            connect: {
                                id: countryId
                            }
                        }
                    }))
                }
            },
            include: this.include
        });
        return new StudentEntity(student);
    }

    async findOne(id: string) {
        const student = await this.prisma.student.findUniqueOrThrow({
            where: {
                id
            },
            include: this.include
        });
        return new StudentEntity(student);
    }

    async deleteStudents(studentIds: string[]) {
        return this.prisma.student.deleteMany({
            where: {
                id: {
                    in: studentIds
                }
            }
        });
    }
}
