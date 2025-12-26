import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TravelPackagesService } from './travel_packages.service';
import { CreateTravelPackageDto } from './dto/create-travel_package.dto';
import { UpdateTravelPackageDto } from './dto/update-travel_package.dto';

@Controller('travel-packages')
export class TravelPackagesController {
  constructor(private readonly travelPackagesService: TravelPackagesService) {}

  @Post()
  create(@Body() createTravelPackageDto: CreateTravelPackageDto) {
    return this.travelPackagesService.create(createTravelPackageDto);
  }

  @Get()
  findAll() {
    return this.travelPackagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.travelPackagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTravelPackageDto: UpdateTravelPackageDto) {
    return this.travelPackagesService.update(+id, updateTravelPackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.travelPackagesService.remove(+id);
  }
}
