import { MiddlewareConsumer, Module, NestModule, Req, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { EmployeeModule } from './employee/employee.module';
import { TouristModule } from './tourist/tourist.module';
import { EmployeeAdminMiddleware } from './middleware/employee_admin.middleware';
import { EmployeStaffMiddleware } from './middleware/employe_staff.middleware';
import { TravelPackagesModule } from './travel_packages/travel_packages.module';
import { PhotoTravelPackageModule } from './photo_travel_package/photo_travel_package.module';
import { TravelModule } from './travel/travel.module';
import { PhotoTravelsModule } from './photo_travels/photo_travels.module';
import { HotelsModule } from './hotels/hotels.module';
import { PhotoHotelsModule } from './photo_hotels/photo_hotels.module';
import { ActivityTravelModule } from './activity_travel/activity_travel.module';
import { PhotoActivityModule } from './photo_activity/photo_activity.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [AuthModule, PrismaModule, EmployeeModule, TouristModule, TravelPackagesModule, PhotoTravelPackageModule, TravelModule, PhotoTravelsModule, HotelsModule, PhotoHotelsModule, ActivityTravelModule, PhotoActivityModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EmployeStaffMiddleware)
      .exclude(
        {path: 'travel-packages', method:  RequestMethod.GET},
        {path: 'travel', method:  RequestMethod.GET},
        {path: 'photo-travels', method:  RequestMethod.GET},
        {path: 'hotels', method:  RequestMethod.GET},
        {path: 'photo-hotels', method:  RequestMethod.GET},
        {path: 'activity-travel', method:  RequestMethod.GET},
        {path: 'photo-activity', method: RequestMethod.GET}
      )
      .forRoutes(
        'tourist', 'photo-travel-package', 'travel-packages', 
        'travel', 'photo-travels', 'hotels', 'photo-hotels', 'activity-travel',
        'photo-activity'
      );

    consumer.apply(EmployeeAdminMiddleware)
      .forRoutes('employee');
  }

}
