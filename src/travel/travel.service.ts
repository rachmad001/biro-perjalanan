import { Injectable } from '@nestjs/common';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TravelService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createTravelDto: CreateTravelDto) {
    const travel_package = await this.prisma.travel_package.findUnique({
      where: {
        id: createTravelDto.travel_package_id,
      }
    });

    if (!travel_package) {
      throw new Error('travel_package_id not found');
    }

    if (travel_package.deletedAt) {
      throw new Error('Cannot add travel to a deleted travel package');
    }

    if (travel_package.is_publish) {
      throw new Error('Cannot add travel to a published travel package');
    }

    if (createTravelDto.startDate >= createTravelDto.endDate) {
      throw new Error('startDate must be before endDate');
    }

    if (createTravelDto.startDate < new Date()) {
      throw new Error('startDate must be in the future');
    }

    if (createTravelDto.endDate < new Date()) {
      throw new Error('endDate must be in the future');
    }

    if (createTravelDto.startPoint === createTravelDto.endPoint) {
      throw new Error('startPoint and endPoint cannot be the same');
    }

    if (createTravelDto.startDate < travel_package?.startdate || createTravelDto.endDate > travel_package.enddate) {
      throw new Error('Travel dates must be within the travel package dates');
    }

    return this.prisma.travel.create({
      data: createTravelDto,
    });
  }

  async findAll() {
    return this.prisma.travel.findMany({
      where: { deletedAt: null },
      include: {
        travel_package: {
          where: { deletedAt: null },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.travel.findFirst({
      where: { id, deletedAt: null },
      include: {
        travel_package: {
          where: { deletedAt: null },
        },
      },
    });
  }

  async update(id: number, updateTravelDto: UpdateTravelDto) {
    const travel_package = await this.prisma.travel_package.findUnique({
      where: {
        id: updateTravelDto.travel_package_id,
      }
    });

    if (!travel_package) {
      throw new Error('travel_package_id not found');
    }
    if (travel_package.deletedAt) {
      throw new Error('Cannot edit travel to a deleted travel package');
    }

    if (travel_package.is_publish) {
      throw new Error('Cannot edit travel to a published travel package');
    }

    if ((updateTravelDto.startDate && updateTravelDto.endDate) && (updateTravelDto.startDate >= updateTravelDto.endDate)) {
      throw new Error('startDate must be before endDate');
    }

    if ((updateTravelDto.startDate) && (updateTravelDto.startDate < new Date())) {
      throw new Error('startDate must be in the future');
    }

    if ((updateTravelDto.endDate) && (updateTravelDto.endDate < new Date())) {
      throw new Error('endDate must be in the future');
    }

    if (updateTravelDto.startPoint === updateTravelDto.endPoint) {
      throw new Error('startPoint and endPoint cannot be the same');
    }

    if ((updateTravelDto.startDate && updateTravelDto.startDate < travel_package?.startdate) || (updateTravelDto.endDate && updateTravelDto.endDate > travel_package.enddate)) {
      throw new Error('Travel dates must be within the travel package dates');
    }


    return this.prisma.travel.update({
      where: { id },
      data: updateTravelDto,
    });
  }

  remove(id: number) {
    const travel_package = await this.prisma.travel_package.findUnique({
      where: {
        id: updateTravelDto.travel_package_id,
      }
    });

    if (!travel_package) {
      throw new Error('travel_package_id not found');
    }
    if (travel_package.deletedAt) {
      throw new Error('cannot remove travel to a deleted travel package');
    }

    if (travel_package.is_publish) {
      throw new Error('Cannot remove travel to a published travel package');
    }

    return this.prisma.travel.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
