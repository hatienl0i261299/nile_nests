import { IsEmail, IsEnum, IsMobilePhone, IsOptional, IsString } from 'class-validator';

export enum Gender {
    Male = 'Male',
    Female = 'Female'
}

export class CreateStudentDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsMobilePhone('vi-VN')
    phone: string;

    @IsOptional()
    @IsString()
    address: string;

    @IsString()
    @IsEnum(Gender)
    gender: Gender;

    countries: string[];
}
