import { PartialType } from '@nestjs/mapped-types';
import { CreatePhotoTravelPackageDto } from './create-photo_travel_package.dto';

export class UpdatePhotoTravelPackageDto extends PartialType(CreatePhotoTravelPackageDto) {}
