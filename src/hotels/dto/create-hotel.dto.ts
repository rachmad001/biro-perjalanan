export class CreateHotelDto {
    name: string;
    location: string;
    roomType: string;
    description?: string;
    around_property?: any;
    popular_around_property?: any;
    checkin: Date;
    checkout: Date;
    travel_package_id: number;
}
