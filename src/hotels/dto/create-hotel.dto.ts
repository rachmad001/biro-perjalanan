export class CreateHotelDto {
    name: string;
    location: string;
    roomType: string;
    description?: string;
    around_property?: Record<string, any>;
    popular_around_property?: Record<string, any>;
    checkin: Date;
    checkout: Date;
    travel_package_id: number;
}
