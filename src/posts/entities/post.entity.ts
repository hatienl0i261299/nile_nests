import { Entity } from 'src/common/entity';
import { Expose } from 'class-transformer';
import { UserEntity } from 'src/users/entities/user.entity';

export class PostEntity extends Entity {
    id: string;
    title: string;
    content: string;
    author: any;
    categories: any[];

    @Expose({ name: 'author' })
    get getAuthor() {
        return new UserEntity(this.author);
    }

    @Expose({ name: 'categories' })
    get getCategories() {
        return this.categories.filter((category) => category.category.published).map((category) => category.category);
    }
}
