import { BadRequestException, Injectable } from '@nestjs/common';
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
      throw new BadRequestException('travel_package_id not found');
    }

    if (travel_package.deletedAt) {
      throw new BadRequestException('Cannot add travel to a deleted travel package');
    }

    if (travel_package.is_publish) {
      throw new BadRequestException('Cannot add travel to a published travel package');
    }

    if (new Date(createTravelDto.startDate) >= new Date(createTravelDto.endDate)) {
      throw new BadRequestException('startDate must be before endDate');
    }

    if (new Date(createTravelDto.startDate) < new Date()) {
      throw new BadRequestException('startDate must be in the future');
    }

    if (new Date(createTravelDto.endDate) < new Date()) {
      throw new BadRequestException('endDate must be in the future');
    }

    if (createTravelDto.startPoint === createTravelDto.endPoint) {
      throw new BadRequestException('startPoint and endPoint cannot be the same');
    }

    if (new Date(createTravelDto.startDate) < new Date(travel_package?.startdate) || new Date(createTravelDto.endDate) > new Date(travel_package.enddate)) {
      throw new BadRequestException('Travel dates must be within the travel package dates');
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
      throw new BadRequestException('travel_package_id not found');
    }
    if (travel_package.deletedAt) {
      throw new BadRequestException('Cannot edit travel to a deleted travel package');
    }

    if (travel_package.is_publish) {
      throw new BadRequestException('Cannot edit travel to a published travel package');
    }

    if ((updateTravelDto.startDate && updateTravelDto.endDate) && (new Date(updateTravelDto.startDate) >= new Date(updateTravelDto.endDate))) {
      throw new BadRequestException('startDate must be before endDate');
    }

    if ((updateTravelDto.startDate) && (new Date(updateTravelDto.startDate) < new Date())) {
      throw new BadRequestException('startDate must be in the future');
    }

    if ((updateTravelDto.endDate) && (new Date(updateTravelDto.endDate) < new Date())) {
      throw new BadRequestException('endDate must be in the future');
    }

    if (updateTravelDto.startPoint === updateTravelDto.endPoint) {
      throw new BadRequestException('startPoint and endPoint cannot be the same');
    }

    if ((updateTravelDto.startDate && new Date(updateTravelDto.startDate) < new Date(travel_package?.startdate)) || (updateTravelDto.endDate && new Date(updateTravelDto.endDate) > new Date(travel_package.enddate))) {
      throw new BadRequestException('Travel dates must be within the travel package dates');
    }


    return this.prisma.travel.update({
      where: { id },
      data: updateTravelDto,
    });
  }

  async remove(id: number) {
    const travel = await this.prisma.travel.findUnique({ where: { id } });
    if (travel?.deletedAt) {
      throw new Error('id was deleted');
    }

    const travel_package = await this.prisma.travel_package.findUnique({
      where: {
        id: travel?.travel_package_id || 0,
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
