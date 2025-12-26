import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePhotoTravelPackageDto } from './dto/create-photo_travel_package.dto';
import { UpdatePhotoTravelPackageDto } from './dto/update-photo_travel_package.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import { join } from 'path';


@Injectable()
export class PhotoTravelPackageService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createPhotoTravelPackageDto: Array<CreatePhotoTravelPackageDto>) {
    let data: Array<any> = [];
    for (const dto of createPhotoTravelPackageDto) {
      const travel = await this.prisma.travel_package.findUnique({
        where: { id: dto.travel_package_id },
      });

      if (!travel) {
        throw new BadRequestException('Travel package not found');
      }

      if (travel?.deletedAt) {
        throw new BadRequestException('Cannot add photo to a deleted travel package');
      }

      const saved = await this.prisma.photo_travel_package.create({
        data: dto,
      });

      data.push(saved);
    }
    return data;
  }

  async findAll() {
    return this.prisma.photo_travel_package.findMany({
      where: { deletedAt: null },
      include: {
        travel_package: {
          where: { deletedAt: null },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.photo_travel_package.findFirst({
      where: { id, deletedAt: null },
      include: {
        travel_package: {
          where: { deletedAt: null },
        },
      },
    });
  }

  async update(id: number, updatePhotoTravelPackageDto: UpdatePhotoTravelPackageDto) {
    return `This action updates a #${id} photoTravelPackage`;
  }

  async remove(id: number, email: string) {
    const data = await this.prisma.photo_travel_package.findFirst({
      where: { id, deletedAt: null },
    });
    if (!data) {
      throw new BadRequestException('Photo travel package not found or already deleted');
    }

    const dataDeleted = await this.prisma.photo_travel_package.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        deletedBy: email,
      },
    });

    if (dataDeleted.path) {
      const filePath = join(process.cwd(), dataDeleted.path);
      try {
        fs.unlinkSync(filePath);
      } catch (error) {
        throw new BadRequestException('Failed to delete file from filesystem: ' + error.message);
      }
    }

    return dataDeleted;
  }
}
