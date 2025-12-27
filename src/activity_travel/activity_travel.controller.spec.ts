import { Test, TestingModule } from '@nestjs/testing';
import { ActivityTravelController } from './activity_travel.controller';
import { ActivityTravelService } from './activity_travel.service';

describe('ActivityTravelController', () => {
  let controller: ActivityTravelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityTravelController],
      providers: [ActivityTravelService],
    }).compile();

    controller = module.get<ActivityTravelController>(ActivityTravelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
