import { PartialType } from '@nestjs/mapped-types';
import { CreatePhotoActivityDto } from './create-photo_activity.dto';

export class UpdatePhotoActivityDto extends PartialType(CreatePhotoActivityDto) {}
