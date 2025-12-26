import { Test, TestingModule } from '@nestjs/testing';
import { PhotoTravelsService } from './photo_travels.service';

describe('PhotoTravelsService', () => {
  let service: PhotoTravelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhotoTravelsService],
    }).compile();

    service = module.get<PhotoTravelsService>(PhotoTravelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
