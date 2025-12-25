import { Test, TestingModule } from '@nestjs/testing';
import { TouristController } from './tourist.controller';
import { TouristService } from './tourist.service';

describe('TouristController', () => {
  let controller: TouristController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TouristController],
      providers: [TouristService],
    }).compile();

    controller = module.get<TouristController>(TouristController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
