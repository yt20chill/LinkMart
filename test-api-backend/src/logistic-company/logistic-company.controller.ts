import { Controller, Get } from '@nestjs/common';

@Controller('logisticCompany')
export class LogisticCompanyController {
  @Get()
  getAllCompanies() {
    return [
      {
        logisticCompanyId: 1,
        companyName: 'DHL',
        companyUrl: 'https://www.dhl.com/en.html',
      },
      {
        logisticCompanyId: 2,
        companyName: 'FedEx',
        companyUrl: 'https://www.fedex.com/en-us/home.html',
      },
    ];
  }
}
