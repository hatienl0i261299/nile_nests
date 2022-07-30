import { IsNumberString } from 'class-validator';

export class FindUsersDto {
  @IsNumberString()
  page: string;

  @IsNumberString()
  pageSize: string;
}
