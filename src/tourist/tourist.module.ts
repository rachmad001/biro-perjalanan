import { Module } from '@nestjs/common';
import { TouristService } from './tourist.service';
import { TouristController } from './tourist.controller';

@Module({
  controllers: [TouristController],
  providers: [TouristService],
})
export class TouristModule {}
