import { Test, TestingModule } from '@nestjs/testing';
import { ActivityTravelService } from './activity_travel.service';

describe('ActivityTravelService', () => {
  let service: ActivityTravelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivityTravelService],
    }).compile();

    service = module.get<ActivityTravelService>(ActivityTravelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
