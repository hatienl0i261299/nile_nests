import { INestApplication, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, 'query' | 'error'> implements OnModuleInit {
    private readonly logger = new Logger(PrismaService.name);

    constructor() {
        super({
            log: [
                { emit: 'event', level: 'query' },
                { emit: 'stdout', level: 'info' },
                { emit: 'stdout', level: 'warn' },
                { emit: 'stdout', level: 'error' }
            ],
            errorFormat: 'colorless'
        });
    }

    async onModuleInit() {
        await this.$connect();
        this.$on<any>('query', (event: Prisma.QueryEvent) => {
            this.logger.log('Query: ' + event.query);
            this.logger.log('Duration: ' + event.duration + 'ms\n\n');
        });
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async (event) => {
            console.log(event.name);
            await app.close();
        });
    }
}
