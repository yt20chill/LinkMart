import { Controller, Get } from '@nestjs/common';

@Controller('api/provider')
export class ProviderController {
  @Get('profile')
  getProfile() {
    return {
      biography: 'I am a provider',
      username: 'Jason',
      starOfEfficiency: 4.5,
      starOfAttitude: 5,
      numberOfReviews: 22,
      reviews: [
        {
          username: 'Jason',
          primaryImage: 'https://loremflickr.com/320/240?random=1',
          item: 'Asuka',
          efficiency: 4.5,
          attitude: 5,
          comments: 'Good',
        },
        {
          username: 'Jason',
          primaryImage: 'https://loremflickr.com/320/240?random=1',
          item: 'Eva 2',
          efficiency: 5,
          attitude: 5,
          comments: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        },
      ],
    };
  }
  @Get('dashboard')
  getDashboard() {
    return {
      balance: 9999,
      reviewCount: 64,
      offerCount: 2,
      taskCount: 3,
      averageEfficiency: 4.5,
      averageAttitude: 5,
    };
  }
}
