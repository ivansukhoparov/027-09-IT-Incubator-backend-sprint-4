import { Controller, Delete, Param } from '@nestjs/common';

@Controller('testing')
export class TestingController {
  @Delete('/all-data/')
  deleteAllData() {
    return 'all data deleted';
  }
}
