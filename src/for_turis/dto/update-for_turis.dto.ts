import { PartialType } from '@nestjs/mapped-types';
import { CreateForTurisDto } from './create-for_turis.dto';

export class UpdateForTurisDto extends PartialType(CreateForTurisDto) {}
