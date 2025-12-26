import { Test, TestingModule } from '@nestjs/testing';
import { PhotoTravelsController } from './photo_travels.controller';
import { PhotoTravelsService } from './photo_travels.service';

describe('PhotoTravelsController', () => {
  let controller: PhotoTravelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotoTravelsController],
      providers: [PhotoTravelsService],
    }).compile();

    controller = module.get<PhotoTravelsController>(PhotoTravelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
