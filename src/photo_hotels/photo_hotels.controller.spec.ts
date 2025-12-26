import { Test, TestingModule } from '@nestjs/testing';
import { PhotoHotelsController } from './photo_hotels.controller';
import { PhotoHotelsService } from './photo_hotels.service';

describe('PhotoHotelsController', () => {
  let controller: PhotoHotelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotoHotelsController],
      providers: [PhotoHotelsService],
    }).compile();

    controller = module.get<PhotoHotelsController>(PhotoHotelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
