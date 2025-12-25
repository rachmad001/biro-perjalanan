import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { EmployeeModule } from './employee/employee.module';
import { TouristModule } from './tourist/tourist.module';
import { EmployeeAdminMiddleware } from './middleware/employee_admin.middleware';
import { EmployeStaffMiddleware } from './middleware/employe_staff.middleware';

@Module({
  imports: [AuthModule, PrismaModule, EmployeeModule, TouristModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EmployeStaffMiddleware)
      .forRoutes('tourist');

    consumer.apply(EmployeeAdminMiddleware)
      .forRoutes('employee');
  }

}
