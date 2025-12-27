import { Test, TestingModule } from '@nestjs/testing';
import { ForTurisController } from './for_turis.controller';
import { ForTurisService } from './for_turis.service';

describe('ForTurisController', () => {
  let controller: ForTurisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForTurisController],
      providers: [ForTurisService],
    }).compile();

    controller = module.get<ForTurisController>(ForTurisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
