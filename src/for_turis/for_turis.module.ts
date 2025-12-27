import { Module } from '@nestjs/common';
import { ForTurisService } from './for_turis.service';
import { ForTurisController } from './for_turis.controller';
import { TravelPackagesModule } from 'src/travel_packages/travel_packages.module';
import { OrderModule } from 'src/order/order.module';

@Module({
  controllers: [ForTurisController],
  providers: [ForTurisService],
  imports: [TravelPackagesModule, OrderModule],
})
export class ForTurisModule {}
