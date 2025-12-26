import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class CreatePhotoTravelPackageDto {
    path?: string;

    @Type(() => Number)
    @IsNumber()
    travel_package_id: number;
}
