import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActivityTravelService } from './activity_travel.service';
import { CreateActivityTravelDto } from './dto/create-activity_travel.dto';
import { UpdateActivityTravelDto } from './dto/update-activity_travel.dto';

@Controller('activity-travel')
export class ActivityTravelController {
  constructor(private readonly activityTravelService: ActivityTravelService) {}

  @Post()
  create(@Body() createActivityTravelDto: CreateActivityTravelDto) {
    return this.activityTravelService.create(createActivityTravelDto);
  }

  @Get()
  findAll() {
    return this.activityTravelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activityTravelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActivityTravelDto: UpdateActivityTravelDto) {
    return this.activityTravelService.update(+id, updateActivityTravelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activityTravelService.remove(+id);
  }
}
