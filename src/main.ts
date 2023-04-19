import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        allowedHeaders: ['content-type'],
        origin: ['http://localhost:4200'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE', 'OPTIONS'],
        credentials: false,
    });
    await app.listen(3000);
    console.log('Server running');
}

bootstrap();
