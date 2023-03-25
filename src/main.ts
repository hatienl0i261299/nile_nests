import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import { HttpExceptionFilter } from 'src/http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));
    await app.listen(parseInt(process.env.PORT, 10));
}
bootstrap();
