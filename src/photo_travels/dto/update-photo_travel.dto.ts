import { PartialType } from '@nestjs/mapped-types';
import { CreatePhotoTravelDto } from './create-photo_travel.dto';

export class UpdatePhotoTravelDto extends PartialType(CreatePhotoTravelDto) {}
