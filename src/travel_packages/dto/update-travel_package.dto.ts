import { PartialType } from '@nestjs/mapped-types';
import { CreateTravelPackageDto } from './create-travel_package.dto';

export class UpdateTravelPackageDto extends PartialType(CreateTravelPackageDto) {}
