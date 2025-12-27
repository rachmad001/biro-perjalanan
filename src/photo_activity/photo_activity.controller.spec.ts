import { Test, TestingModule } from '@nestjs/testing';
import { PhotoActivityController } from './photo_activity.controller';
import { PhotoActivityService } from './photo_activity.service';

describe('PhotoActivityController', () => {
  let controller: PhotoActivityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotoActivityController],
      providers: [PhotoActivityService],
    }).compile();

    controller = module.get<PhotoActivityController>(PhotoActivityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
