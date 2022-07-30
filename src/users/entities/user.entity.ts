import { Exclude, Expose } from 'class-transformer';
import { formatDatetime } from 'src/common/utils';

export class UserEntity {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;

  @Expose({ name: 'createdAt' })
  get created() {
    return formatDatetime(new Date(this.createdAt));
  }

  @Expose({ name: 'updatedAt' })
  get updated() {
    return formatDatetime(new Date(this.updatedAt));
  }

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
