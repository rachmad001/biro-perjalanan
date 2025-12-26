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

@Module({
  imports: [AuthModule, PrismaModule, EmployeeModule, TouristModule, TravelPackagesModule, PhotoTravelPackageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EmployeStaffMiddleware)
      .exclude({path: 'travel-packages', method:  RequestMethod.GET},)
      .forRoutes('tourist', 'photo-travel-package', 'travel-packages');

    consumer.apply(EmployeeAdminMiddleware)
      .forRoutes('employee');
  }

}
