import { Test, TestingModule } from '@nestjs/testing';
import { PhotoTravelPackageController } from './photo_travel_package.controller';
import { PhotoTravelPackageService } from './photo_travel_package.service';

describe('PhotoTravelPackageController', () => {
  let controller: PhotoTravelPackageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotoTravelPackageController],
      providers: [PhotoTravelPackageService],
    }).compile();

    controller = module.get<PhotoTravelPackageController>(PhotoTravelPackageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
