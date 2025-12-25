import { Role } from "@prisma/client";

export interface Employee {
    fullName: string;
    email: string;
    password: string;
    role: Role;
    updatedAt?: Date;
    deletedAt?: Date | null;
    deletedBy?: string | null;
}
