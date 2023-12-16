import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestController } from './request/request.controller';
import { RequestModule } from './request/request.module';
import { CategoryModule } from './category/category.module';
import { LocationModule } from './location/location.module';
import { UserModule } from './user/user.module';
import { ApiController } from './api/api.controller';
import { ApiModule } from './api/api.module';

@Module({
  imports: [RequestModule, CategoryModule, LocationModule, UserModule, ApiModule],
  controllers: [AppController, RequestController, ApiController],
  providers: [AppService],
})
export class AppModule {}
