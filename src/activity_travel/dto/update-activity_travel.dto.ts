import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityTravelDto } from './create-activity_travel.dto';

export class UpdateActivityTravelDto extends PartialType(CreateActivityTravelDto) {}
