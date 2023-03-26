import { PrismaService } from 'src/prisma.service';
import * as _ from 'lodash';

export async function pagination<T>(prisma: PrismaService, service: T | any, params: any, ServiceEntity: any) {
    const { skip, take, where } = params;
    const [totalEntries, results] = await prisma.$transaction([service.count({ where }), service.findMany(params)]);
    return {
        totalEntries,
        totalPage: Math.floor(totalEntries / take) + 1,
        currentPage: skip / take + 1,
        results: _.map(results, (result) => new ServiceEntity(result))
    };
}
