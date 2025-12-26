import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePhotoHotelDto } from './dto/create-photo_hotel.dto';
import { UpdatePhotoHotelDto } from './dto/update-photo_hotel.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class PhotoHotelsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createPhotoHotelDto: Array<CreatePhotoHotelDto>) {
    let data: Array<any> = [];
    for (const dto of createPhotoHotelDto) {
      const hotel = await this.prisma.hotels.findUnique({
        where: { id: dto.hotels_id },
      });
      if (!hotel) {
        throw new BadRequestException('Hotel not found');
      }

      if (hotel?.deletedAt) {
        throw new BadRequestException('Cannot add photo to a deleted hotel');
      }

      const saved = await this.prisma.photo_hotels.create({
        data: dto,
      });
      data.push(saved);
    }
    return data;
  }

  async findAll() {
    return this.prisma.photo_hotels.findMany({
      where: { deletedAt: null },
      include: {
        hotel: {
          where: { deletedAt: null },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.photo_hotels.findUnique({
      where: { id },
      include: {
        hotel: {
          where: { deletedAt: null },
        },
      },
    });
  }

  // async update(id: number, updatePhotoHotelDto: UpdatePhotoHotelDto) {

  //   return this.prisma.photo_hotels.update({
  //     where: { id },
  //     data: updatePhotoHotelDto,
  //   });
  // }

  async remove(id: number) {
    const data = this.prisma.photo_hotels.findFirst({
      where: { id, deletedAt: null },
    });
    if (!data) {
      throw new BadRequestException('Photo hotel not found or already deleted');
    }

    const dataDeleted = await this.prisma.photo_hotels.update({
      where: { id },
      data: { deletedAt: new Date() },
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
