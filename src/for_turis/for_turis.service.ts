import { Injectable } from '@nestjs/common';
import { CreateForTurisDto } from './dto/create-for_turis.dto';
import { UpdateForTurisDto } from './dto/update-for_turis.dto';
import { TravelPackagesService } from 'src/travel_packages/travel_packages.service';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class ForTurisService {
  constructor(
    private readonly travelPackageService: TravelPackagesService,
    private readonly orderService: OrderService,
  ) {}

  async findAllTravel() {
    return await this.travelPackageService.findAll();
  }

  async history(id: number) {
    return await this.orderService.findOne(id);
  }
  
  create(createForTurisDto: CreateForTurisDto) {
    return 'This action adds a new forTuris';
  }

  findAll() {
    return `This action returns all forTuris`;
  }

  findOne(id: number) {
    return `This action returns a #${id} forTuris`;
  }

  update(id: number, updateForTurisDto: UpdateForTurisDto) {
    return `This action updates a #${id} forTuris`;
  }

  remove(id: number) {
    return `This action removes a #${id} forTuris`;
  }
}
