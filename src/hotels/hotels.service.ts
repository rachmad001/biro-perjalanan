import { BadRequestException, Injectable } from '@nestjs/common';
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
      throw new BadRequestException('Invalid travel package ID');
    }

    if (travel_package.is_publish) {
      throw new BadRequestException('Cannot add hotel to a published travel package');
    }

    if (new Date(createHotelDto.checkin) >= new Date(createHotelDto.checkout)) {
      throw new BadRequestException('checkInDate must be before checkOutDate');
    }

    if (new Date(createHotelDto.checkin) < new Date()) {
      throw new BadRequestException('checkInDate must be in the future');
    }

    if (new Date(createHotelDto.checkout) < new Date()) {
      throw new BadRequestException('checkOutDate must be in the future');
    }

    if (new Date(createHotelDto.checkin) < new Date(travel_package.startdate) || new Date(createHotelDto.checkout) > new Date(travel_package.enddate)) {
      throw new BadRequestException('Hotel dates must be within the travel package dates');
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
        photos: {
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
      throw new BadRequestException('Invalid travel package ID');
    }

    if (travel_package.is_publish) {
      throw new BadRequestException('Cannot edit hotel to a published travel package');
    }

    if (updateHotelDto.checkin && updateHotelDto.checkout) {
      if (new Date(updateHotelDto.checkin) >= new Date(updateHotelDto.checkout)) {
        throw new BadRequestException('checkInDate must be before checkOutDate');
      }
      if (new Date(updateHotelDto.checkin) < new Date()) {
        throw new BadRequestException('checkInDate must be in the future');
      }
      if (new Date(updateHotelDto.checkout) < new Date()) {
        throw new BadRequestException('checkOutDate must be in the future');
      }
      if (new Date(updateHotelDto.checkin) < new Date(travel_package.startdate) || new Date(updateHotelDto.checkout) > new Date(travel_package.enddate)) {
        throw new BadRequestException('Hotel dates must be within the travel package dates');
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
      throw new BadRequestException('id was deleted');
    }

    const travel_package = await this.prismaService.travel_package.findUnique({
      where: { id: hotel?.travel_package_id || 0 },
    });

    if (!travel_package || travel_package.deletedAt) {
      throw new BadRequestException('Invalid travel package ID');
    }

    if (travel_package.is_publish) {
      throw new BadRequestException('Cannot remove hotel from a published travel package');
    }

    return this.prismaService.hotels.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
