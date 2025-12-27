import { Module } from '@nestjs/common';
import { PhotoActivityService } from './photo_activity.service';
import { PhotoActivityController } from './photo_activity.controller';

@Module({
  controllers: [PhotoActivityController],
  providers: [PhotoActivityService],
})
export class PhotoActivityModule {}
