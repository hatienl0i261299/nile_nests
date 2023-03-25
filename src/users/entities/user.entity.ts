import { Exclude, Expose } from 'class-transformer';
import { Entity } from 'src/common/entity';
import * as _ from 'lodash';

export class UserEntity extends Entity {
    id: string;
    posts: any[];

    @Exclude()
    password: string;

    @Expose({ name: 'posts' })
    get getPosts() {
        return _.map(this.posts, (post) => new Entity(post));
    }
}
