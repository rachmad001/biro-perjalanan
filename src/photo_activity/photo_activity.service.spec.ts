import { Test, TestingModule } from '@nestjs/testing';
import { PhotoActivityService } from './photo_activity.service';

describe('PhotoActivityService', () => {
  let service: PhotoActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhotoActivityService],
    }).compile();

    service = module.get<PhotoActivityService>(PhotoActivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
