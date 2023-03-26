import { Exclude, Expose } from 'class-transformer';
import { Entity } from 'src/common/entity';
import * as _ from 'lodash';
import { PostEntity } from 'src/posts/entities/post.entity';

export class UserEntity extends Entity {
    id: string;
    posts: PostEntity[];

    @Exclude()
    password: string;

    @Expose({ name: 'posts' })
    get getPosts() {
        return _.map(
            _.filter(this.posts, (post) => post.published),
            (post) => new Entity(post)
        );
    }
}
