import { Role } from "@prisma/client";

export class CreateEmployeeDto {
    fullName: string;
    email: string;
    password: string;
    role: Role;
    kodeRole: string;
}
