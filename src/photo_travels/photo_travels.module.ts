import { Module } from '@nestjs/common';
import { PhotoTravelsService } from './photo_travels.service';
import { PhotoTravelsController } from './photo_travels.controller';

@Module({
  controllers: [PhotoTravelsController],
  providers: [PhotoTravelsService],
})
export class PhotoTravelsModule {}
