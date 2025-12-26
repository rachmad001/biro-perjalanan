import { Injectable } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HotelsService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createHotelDto: CreateHotelDto) {
    const travel_package = await this.prismaService.travel_package.findUnique({
      where: { id: createHotelDto.travel_package_id },
    });

    if (!travel_package || travel_package.deletedAt) {
      throw new Error('Invalid travel package ID');
    }

    if (travel_package.is_publish) {
      throw new Error('Cannot add hotel to a published travel package');
    }

    if (createHotelDto.checkin >= createHotelDto.checkout) {
      throw new Error('checkInDate must be before checkOutDate');
    }

    if (createHotelDto.checkin < new Date()) {
      throw new Error('checkInDate must be in the future');
    }

    if (createHotelDto.checkout < new Date()) {
      throw new Error('checkOutDate must be in the future');
    }

    if (createHotelDto.checkin < travel_package.startdate || createHotelDto.checkout > travel_package.enddate) {
      throw new Error('Hotel dates must be within the travel package dates');
    }
    return this.prismaService.hotels.create({
      data: createHotelDto,
    });
  }

  async findAll() {
    return this.prismaService.hotels.findMany({
      where: { deletedAt: null },
      include: {
        travel_package: {
          where: { deletedAt: null },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prismaService.hotels.findFirst({
      where: { id, deletedAt: null },
      include: {
        travel_package: {
          where: { deletedAt: null },
        },
      },
    });
  }

  async update(id: number, updateHotelDto: UpdateHotelDto) {
    const travel_package = await this.prismaService.travel_package.findUnique({
      where: { id: updateHotelDto.travel_package_id },
    });

    if (!travel_package || travel_package.deletedAt) {
      throw new Error('Invalid travel package ID');
    }

    if (travel_package.is_publish) {
      throw new Error('Cannot edit hotel to a published travel package');
    }

    if (updateHotelDto.checkin && updateHotelDto.checkout) {
      if (updateHotelDto.checkin >= updateHotelDto.checkout) {
        throw new Error('checkInDate must be before checkOutDate');
      }
      if (updateHotelDto.checkin < new Date()) {
        throw new Error('checkInDate must be in the future');
      }
      if (updateHotelDto.checkout < new Date()) {
        throw new Error('checkOutDate must be in the future');
      }
      if (updateHotelDto.checkin < travel_package.startdate || updateHotelDto.checkout > travel_package.enddate) {
        throw new Error('Hotel dates must be within the travel package dates');
      }
    }

    return this.prismaService.hotels.update({
      where: { id },
      data: updateHotelDto,
    });
  }

  async remove(id: number) {
    const hotel = await this.prismaService.hotels.findUnique({ where: { id } });
    if (hotel?.deletedAt) {
      throw new Error('id was deleted');
    }

    const travel_package = await this.prismaService.travel_package.findUnique({
      where: { id: hotel?.travel_package_id },
    });

    if (!travel_package || travel_package.deletedAt) {
      throw new Error('Invalid travel package ID');
    }

    if (travel_package.is_publish) {
      throw new Error('Cannot remove hotel from a published travel package');
    }

    return this.prismaService.hotels.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
