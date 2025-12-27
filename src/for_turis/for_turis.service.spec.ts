import { Test, TestingModule } from '@nestjs/testing';
import { ForTurisService } from './for_turis.service';

describe('ForTurisService', () => {
  let service: ForTurisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ForTurisService],
    }).compile();

    service = module.get<ForTurisService>(ForTurisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
