import { PartialType } from '@nestjs/mapped-types';
import { CreatePhotoHotelDto } from './create-photo_hotel.dto';

export class UpdatePhotoHotelDto extends PartialType(CreatePhotoHotelDto) {}
