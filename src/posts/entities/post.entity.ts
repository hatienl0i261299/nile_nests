import { Entity } from 'src/common/entity';
import { Expose } from 'class-transformer';
import { UserEntity } from 'src/users/entities/user.entity';

export class PostEntity extends Entity {
  id: string;
  title: string;
  content: string;
  author: any[];

  @Expose({ name: 'author' })
  get getAuthor() {
    return new UserEntity(this.author);
  }
}
