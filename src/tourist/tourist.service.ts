import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateTouristDto } from './dto/create-tourist.dto';
import { UpdateTouristDto } from './dto/update-tourist.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TouristService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTouristDto: CreateTouristDto) {
    return this.prisma.tourist.create({
      data: createTouristDto,
    });
  }

  async findAll() {
    return this.prisma.tourist.findMany({
      where: { deletedAt: null },
      include: {
        order: {
          where: { deletedAt: null },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.tourist.findFirst({
      where: { id, deletedAt: null },
      include: {
        order: {
          where: { deletedAt: null },
        },
      },
    });
  }

  async update(id: number, updateTouristDto: UpdateTouristDto) {
    const tourist = await this.prisma.tourist.findUnique({ where: { id } });
    if (tourist?.deletedAt) {
      throw new BadRequestException('id was deleted');
    }
    return this.prisma.tourist.update({
      where: { id },
      data: updateTouristDto,
    });
  }

  async remove(id: number) {
    const tourist = await this.prisma.tourist.findUnique({ where: { id } });
    if (tourist?.deletedAt) {
      throw new BadRequestException('id was deleted');
    }
    // Soft delete: set deletedAt to current date
    return this.prisma.tourist.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
