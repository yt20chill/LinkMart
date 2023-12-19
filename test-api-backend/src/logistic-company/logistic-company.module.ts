import { Module } from '@nestjs/common';
import { LogisticCompanyController } from './logistic-company.controller';

@Module({
  controllers: [LogisticCompanyController]
})
export class LogisticCompanyModule {}
