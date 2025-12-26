import { ClassType, Role } from "@prisma/client";

export class CreateTravelDto {
    brandName: string;
    classType: ClassType;
    startDate: Date;
    endDate: Date;
    startPoint: string;
    endPoint: string;
    travel_package_id?: number;
}
