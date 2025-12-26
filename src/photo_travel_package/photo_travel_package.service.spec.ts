import { Test, TestingModule } from '@nestjs/testing';
import { PhotoTravelPackageService } from './photo_travel_package.service';

describe('PhotoTravelPackageService', () => {
  let service: PhotoTravelPackageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhotoTravelPackageService],
    }).compile();

    service = module.get<PhotoTravelPackageService>(PhotoTravelPackageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
