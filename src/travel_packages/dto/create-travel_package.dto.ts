export class CreateTravelPackageDto {
    name: string;
    destinasi: string;
    startdate: Date;
    enddate: Date;
    is_publish?: boolean;
}
