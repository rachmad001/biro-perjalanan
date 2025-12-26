import { Module } from '@nestjs/common';
import { TravelPackagesService } from './travel_packages.service';
import { TravelPackagesController } from './travel_packages.controller';

@Module({
  controllers: [TravelPackagesController],
  providers: [TravelPackagesService],
})
export class TravelPackagesModule {}
