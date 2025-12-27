import { Module } from '@nestjs/common';
import { ActivityTravelService } from './activity_travel.service';
import { ActivityTravelController } from './activity_travel.controller';

@Module({
  controllers: [ActivityTravelController],
  providers: [ActivityTravelService],
})
export class ActivityTravelModule {}
