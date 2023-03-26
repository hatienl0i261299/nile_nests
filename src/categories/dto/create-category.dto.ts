import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
    @IsBoolean()
    published: boolean;

    @IsNotEmpty()
    @IsString()
    name: string;
}
