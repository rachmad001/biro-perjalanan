import { Module } from '@nestjs/common';
import { PhotoHotelsService } from './photo_hotels.service';
import { PhotoHotelsController } from './photo_hotels.controller';

@Module({
  controllers: [PhotoHotelsController],
  providers: [PhotoHotelsService],
})
export class PhotoHotelsModule {}
