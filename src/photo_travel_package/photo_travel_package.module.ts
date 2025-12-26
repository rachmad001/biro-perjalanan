import { Module } from '@nestjs/common';
import { PhotoTravelPackageService } from './photo_travel_package.service';
import { PhotoTravelPackageController } from './photo_travel_package.controller';

@Module({
  controllers: [PhotoTravelPackageController],
  providers: [PhotoTravelPackageService],
})
export class PhotoTravelPackageModule {}
