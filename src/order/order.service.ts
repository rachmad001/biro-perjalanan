import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createOrderDto: CreateOrderDto) {
    const tourist = await this.prisma.tourist.findUnique({
      where: { id: createOrderDto.touristId },
    });
    if (!tourist) {
      throw new BadRequestException('Tourist not found');
    }

    if (tourist.deletedAt) {
      throw new BadRequestException('Cannot create order for a deleted tourist');
    }

    const travel_package = await this.prisma.travel_package.findUnique({
      where: { id: createOrderDto.packageId },
    });

    if (!travel_package) {
      throw new BadRequestException('Travel package not found');
    }

    if (travel_package.deletedAt) {
      throw new BadRequestException('Cannot create order for a deleted travel package');
    }

    if (!travel_package.is_publish) {
      throw new BadRequestException('Cannot create order for an unpublished travel package');
    }

    return this.prisma.order.create({
      data: createOrderDto
    });
  }

  async findAll() {
    return await this.prisma.order.findMany({
      where: { deletedAt: null },
      include: {
        tourist: {
          where: { deletedAt: null },
        },
        package: {
          where: { deletedAt: null },
          include: {
            activity_travels: {
              where: { deletedAt: null },
              include: {
                photos: {
                  where: { deletedAt: null },
                },
              },
            },
            photos: {
              where: { deletedAt: null },
            },
            travels: {
              where: { deletedAt: null },
              include: {
                photos: {
                  where: { deletedAt: null },
                },
              },
            },
            hotels: {
              where: { deletedAt: null },
              include: {
                photos: {
                  where: { deletedAt: null },
                },
              },
            },
          }
        }
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.order.findUnique({
      where: { id, deletedAt: null },
      include: {
        tourist: {
          where: { deletedAt: null },
        },
        package: {
          where: { deletedAt: null },
          include: {
            activity_travels: {
              where: { deletedAt: null },
              include: {
                photos: {
                  where: { deletedAt: null },
                },
              },
            },
            photos: {
              where: { deletedAt: null },
            },
            travels: {
              where: { deletedAt: null },
              include: {
                photos: {
                  where: { deletedAt: null },
                },
              },
            },
            hotels: {
              where: { deletedAt: null },
              include: {
                photos: {
                  where: { deletedAt: null },
                },
              },
            }
          }
        }
      }
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) {
      throw new BadRequestException('Order not found');
    }
    if (order?.deletedAt) {
      throw new BadRequestException('id was deleted');
    }

    const tourist = await this.prisma.tourist.findUnique({ where: { id: updateOrderDto.touristId } });
    if (!tourist) {
      throw new BadRequestException('Tourist not found');
    }
    if (tourist?.deletedAt) {
      throw new BadRequestException('Cannot update order for a deleted tourist');
    }

    const travel_package = await this.prisma.travel_package.findUnique({ where: { id: updateOrderDto.packageId } });
    if (!travel_package) {
      throw new BadRequestException('Travel package not found');
    }
    if (travel_package?.deletedAt) {
      throw new BadRequestException('Cannot update order for a deleted travel package');
    }

    return await this.prisma.order.update({
      where: { id },
      data: updateOrderDto
    });
  }

  async remove(id: number) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) {
      throw new BadRequestException('Order not found');
    }
    if (order?.deletedAt) {
      throw new BadRequestException('id was deleted');
    }

    return await this.prisma.order.update({
      where: { id },
      data: { deletedAt: new Date() }
    });
  }
}
