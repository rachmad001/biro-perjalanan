import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateActivityTravelDto } from './dto/create-activity_travel.dto';
import { UpdateActivityTravelDto } from './dto/update-activity_travel.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActivityTravelService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createActivityTravelDto: CreateActivityTravelDto) {
    const travel_package = await this.prisma.travel_package.findUnique({
      where: { id: createActivityTravelDto.travel_package_id },
    });

    if (!travel_package) {
      throw new BadRequestException('Travel package not found');
    }

    if (travel_package.deletedAt) {
      throw new BadRequestException('Cannot add activity to a deleted travel package');
    }

    if (travel_package.is_publish) {
      throw new BadRequestException('Cannot add activity to a published travel package');
    }

    if (new Date(createActivityTravelDto.startDate) > new Date(createActivityTravelDto.endDate)) {
      throw new BadRequestException('Start date cannot be later than end date');
    }

    if (new Date(createActivityTravelDto.endDate) < new Date()) {
      throw new BadRequestException('End date cannot be in the past');
    }

    if(new Date(createActivityTravelDto.startDate) < new Date()) {
      throw new BadRequestException('Start date cannot be in the past');
    }

    if (new Date(createActivityTravelDto.startDate) < new Date(travel_package.startdate) || new Date(createActivityTravelDto.endDate) > new Date(travel_package.enddate)) {
      throw new BadRequestException('Activity dates must be within the travel package dates');
    }

    return this.prisma.activity_travel.create({
      data: createActivityTravelDto,
    });
  }

  async findAll() {
    return await this.prisma.activity_travel.findMany({
      where: { deletedAt: null },
      include: {
        travel_package: {
          where: { deletedAt: null },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.activity_travel.findUnique({
      where: { id, deletedAt: null },
    });
  }

  async update(id: number, updateActivityTravelDto: UpdateActivityTravelDto) {
    const activity = await this.prisma.activity_travel.findUnique({
      where: { id },
    });

    if (!activity) {
      throw new BadRequestException('Activity travel not found');
    }

    if (activity.deletedAt) {
      throw new BadRequestException('Cannot update a deleted activity travel');
    }

    const travel_package = await this.prisma.travel_package.findUnique({
      where: { id: activity.travel_package_id || 0 },
    });

    if(!travel_package) {
      throw new BadRequestException('Associated travel package not found');
    }

    if (travel_package.is_publish) {
      throw new BadRequestException('Cannot update activity of a published travel package');
    }
    return await this.prisma.activity_travel.update({
      where: { id },
      data: updateActivityTravelDto,
    });
  }

  async remove(id: number) {
    const activity = await this.prisma.activity_travel.findUnique({
      where: { id },
    });

    if (!activity) {
      throw new BadRequestException('Activity travel not found');
    }

    if (activity.deletedAt) {
      throw new BadRequestException('Cannot delete a deleted activity travel');
    }

    const travel_package = await this.prisma.travel_package.findUnique({
      where: { id: activity.travel_package_id || 0 },
    });

    if(!travel_package) {
      throw new BadRequestException('Associated travel package not found');
    }

    if (travel_package.is_publish) {
      throw new BadRequestException('Cannot delete activity of a published travel package');
    }

    return await this.prisma.activity_travel.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}