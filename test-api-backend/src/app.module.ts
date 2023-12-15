import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestController } from './request/request.controller';
import { RequestModule } from './request/request.module';
import { CategoryModule } from './category/category.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [RequestModule, CategoryModule, LocationModule],
  controllers: [AppController, RequestController],
  providers: [AppService],
})
export class AppModule {}
