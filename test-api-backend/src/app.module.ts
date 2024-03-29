import { Module } from '@nestjs/common';
import { ApiController } from './api/api.controller';
import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { LocationModule } from './location/location.module';
import { RequestController } from './request/request.controller';
import { RequestModule } from './request/request.module';
import { UserModule } from './user/user.module';
import { OfferModule } from './offer/offer.module';
import { OrderModule } from './order/order.module';
import { LogisticCompanyModule } from './logistic-company/logistic-company.module';
import { ProviderModule } from './provider/provider.module';

@Module({
  imports: [
    RequestModule,
    CategoryModule,
    LocationModule,
    UserModule,
    ApiModule,
    AuthModule,
    OfferModule,
    OrderModule,
    LogisticCompanyModule,
    ProviderModule,
  ],
  controllers: [AppController, RequestController, ApiController],
  providers: [AppService],
})
export class AppModule {}
