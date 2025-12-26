import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateTravelPackageDto } from './dto/create-travel_package.dto';
import { UpdateTravelPackageDto } from './dto/update-travel_package.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TravelPackagesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTravelPackageDto: CreateTravelPackageDto) {
    return this.prisma.travel_package.create({
      data: createTravelPackageDto,
    });
  }

  findAll() {
    return this.prisma.travel_package.findMany({
      where: { deletedAt: null },
      include: {
        orders: {
          where: { deletedAt: null },
        },
        travels:  {
          where: { deletedAt: null },
        },
        hotels: {
          where: { deletedAt: null },
        },
        photos: {
          where: { deletedAt: null },
        }
      }
    });
  }

  findOne(id: number) {
    return this.prisma.travel_package.findFirst({
      where: { id, deletedAt: null },
      include: {
        orders: {
          where: { deletedAt: null },
        },
        travels:  {
          where: { deletedAt: null },
        },
        hotels: {
          where: { deletedAt: null },
        },
        photos: {
          where: { deletedAt: null },
        }
      }
    });
  }

  async update(id: number, updateTravelPackageDto: UpdateTravelPackageDto) {
    const travelPackage = await this.prisma.travel_package.findUnique({ where: { id } });
    if (travelPackage?.deletedAt) {
      throw new BadRequestException('data was deleted');
    }
    return this.prisma.travel_package.update({
      where: { id },
      data: updateTravelPackageDto,
    });
  }

  async remove(id: number) {
    const travelPackage = await this.prisma.travel_package.findUnique({ where: { id } });
    if (travelPackage?.deletedAt) {
      throw new BadRequestException('data was deleted');
    }

    return this.prisma.travel_package.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
