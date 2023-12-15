import { Controller, Get } from '@nestjs/common';

@Controller('category')
export class CategoryController {
  @Get()
  getAll() {
    return [
      {
        categoryId: 1,
        categoryName: 'clothes',
      },
      {
        categoryId: 2,
        categoryName: 'electronics',
      },
      {
        categoryId: 3,
        categoryName: 'books',
      },
      {
        categoryId: 4,
        categoryName: 'home decor',
      },
      {
        categoryId: 5,
        categoryName: 'toys',
      },
      {
        categoryId: 6,
        categoryName: 'sports equipment',
      },
      {
        categoryId: 7,
        categoryName: 'jewelry',
      },
      {
        categoryId: 8,
        categoryName: 'beauty products',
      },
      {
        categoryId: 9,
        categoryName: 'kitchen appliances',
      },
      {
        categoryId: 10,
        categoryName: 'furniture',
      },
    ];
  }
  @Get('/:id')
  getCategoryOptions() {
    return [
      {
        categoryFieldId: 1,
        categoryFieldName: 'Size',
        categoryFieldOptions: ['S', 'M', 'L'],
      },
      {
        categoryFieldId: 1,
        categoryFieldName: 'Brand',
        categoryFieldOptions: [],
      },
    ];
  }
}
