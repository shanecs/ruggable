import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GLOBAL_CONFIG } from '../../configs/global.config';
import { LoggerModule } from '../logger/logger.module';
import { Module } from '@nestjs/common';
import { PrintListModule } from '../printList/printList.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
// import { PostModule } from '../post/post.module';

// import { AuthModule } from '../auth/auth.module';


@Module({
  imports: [
    LoggerModule,
    PrismaModule,
    // AuthModule,
    UserModule,
    // PostModule,
    PrintListModule,
    ConfigModule.forRoot({ isGlobal: true, load: [() => GLOBAL_CONFIG] }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
