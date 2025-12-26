import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePhotoTravelDto } from './dto/create-photo_travel.dto';
import { UpdatePhotoTravelDto } from './dto/update-photo_travel.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class PhotoTravelsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPhotoTravelDto: Array<CreatePhotoTravelDto>) {
    let data: Array<any> = [];
    for (const dto of createPhotoTravelDto) {
      const travel = await this.prisma.travel.findUnique({
        where: { id: dto.travel_id },
      });
      if (!travel) {
        throw new Error('Travel not found');
      }
      if (travel?.deletedAt) {
        throw new Error('Cannot add photo to a deleted travel');
      }
      const saved = await this.prisma.photo_travel.create({
        data: dto,
      });
      data.push(saved);
    }
    return data;
  }

  async findAll() {
    return await this.prisma.photo_travel.findMany({
      where: { deletedAt: null },
      include: {
        travel: {
          where: { deletedAt: null },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.photo_travel.findUnique({
      where: { id },
      include: {
        travel: {
          where: { deletedAt: null },
        },
      },
    });
  }

  update(id: number, updatePhotoTravelDto: UpdatePhotoTravelDto) {
    return `This action updates a #${id} photoTravel`;
  }

  async remove(id: number) {
    const data = await this.prisma.photo_travel.findFirst({
      where: { id, deletedAt: null },
    });
    if (!data) {
      throw new Error('Photo travel not found or already deleted');
    }

    const dataDeleted = await this.prisma.photo_travel.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    if (dataDeleted.path) {
      const filePath = join(process.cwd(), dataDeleted.path);
      try {
        fs.unlinkSync(filePath);
      } catch (error) {
        throw new BadRequestException('Error deleting file from filesystem');
      }
    }
    return dataDeleted;
  }
}
