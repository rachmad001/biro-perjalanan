import { Test, TestingModule } from '@nestjs/testing';
import { PhotoHotelsService } from './photo_hotels.service';

describe('PhotoHotelsService', () => {
  let service: PhotoHotelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhotoHotelsService],
    }).compile();

    service = module.get<PhotoHotelsService>(PhotoHotelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
