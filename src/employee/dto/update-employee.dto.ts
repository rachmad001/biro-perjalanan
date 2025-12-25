import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { Role } from '@prisma/client';

export class UpdateEmployeeDto {
    fullName?: string;
    password?: string;
    role?: Role;
}
