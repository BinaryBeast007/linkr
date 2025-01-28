import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ShortUrlsModule } from './short-urls/short-urls.module';

@Module({
  imports: [UsersModule, ShortUrlsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
