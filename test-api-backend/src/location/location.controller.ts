import { Controller, Get } from '@nestjs/common';

@Controller('location')
export class LocationController {
  @Get()
  getAll() {
    return [
      {
        locationId: 1,
        locationName: '🇺🇸 United States',
      },
      {
        locationId: 2,
        locationName: '🇨🇦 Canada',
      },
      {
        locationId: 3,
        locationName: '🇬🇧 United Kingdom',
      },
      {
        locationId: 4,
        locationName: '🇦🇺 Australia',
      },
      {
        locationId: 5,
        locationName: '🇩🇪 Germany',
      },
      {
        locationId: 6,
        locationName: '🇫🇷 France',
      },
      {
        locationId: 7,
        locationName: '🇯🇵 Japan',
      },
      {
        locationId: 8,
        locationName: '🇮🇳 India',
      },
      {
        locationId: 9,
        locationName: '🇧🇷 Brazil',
      },
      {
        locationId: 10,
        locationName: '🇨🇳 China',
      },
    ];
  }
}
