import { Expose } from 'class-transformer';
import { formatDatetime } from 'src/common/utils';

export class Entity {
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

    constructor(partial: any) {
        Object.assign(this, partial);
    }
}
