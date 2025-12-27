import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePhotoActivityDto } from './dto/create-photo_activity.dto';
import { UpdatePhotoActivityDto } from './dto/update-photo_activity.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class PhotoActivityService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createPhotoActivityDto: Array<CreatePhotoActivityDto>) {
    let data: Array<any> = [];
    for (const dto of createPhotoActivityDto) {
      const activity_travel = await this.prisma.activity_travel.findUnique({
        where: { id: dto.activity_travel_id },
      });
      if (!activity_travel) {
        throw new BadRequestException('Activity travel not found');
      }
      if (activity_travel?.deletedAt) {
        throw new BadRequestException('Cannot add photo to a deleted activity travel');
      }

      const saved = await this.prisma.photo_activity.create({
        data: dto,
      });
      data.push(saved);
    }
    return data;
  }

  async findAll() {
    return await this.prisma.photo_activity.findMany({
      where: { deletedAt: null },
      include: {
        activity_travel: {
          where: { deletedAt: null },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.photo_activity.findFirst({
      where: { id, deletedAt: null },
      include: {
        activity_travel: {
          where: { deletedAt: null },
        },
      },
    });
  }

  update(id: number, updatePhotoActivityDto: UpdatePhotoActivityDto) {
    return `This action updates a #${id} photoActivity`;
  }

  async remove(id: number) {
    const photoActivity = await this.prisma.photo_activity.findUnique({
      where: { id },
    });
    if (!photoActivity) {
      throw new BadRequestException('Photo activity not found');
    }
    if (photoActivity?.deletedAt) {
      throw new BadRequestException('Photo activity already deleted');
    }

    const deleted = await this.prisma.photo_activity.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    if (deleted.path) {
      const filePath = join(process.cwd(), deleted.path);
      try {
        fs.unlinkSync(filePath);
      } catch (error) {
        throw new BadRequestException('Failed to delete file from filesystem: ' + error.message);
      }
    }

    return deleted;
  }
}