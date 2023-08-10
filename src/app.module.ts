import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagModule } from './tag/tag.module';
import { UserModule } from './user/user.module';
import config from './ormconfig';
import { AuthMiddleware } from './user/middleware/auth.middleware';

@Module({
    imports: [TypeOrmModule.forRoot(config), TagModule, UserModule],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {
    configure(consumer: MiddlewareConsumer){
        consumer
            .apply(AuthMiddleware)
            .forRoutes({
            path: 'user',
            method: RequestMethod.ALL
        })
    }
}
