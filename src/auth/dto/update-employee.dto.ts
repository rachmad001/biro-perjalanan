import { Role } from "@prisma/client";

export class UpdateEmployeeDto {
    fullName?: string;
    password?: string;
}