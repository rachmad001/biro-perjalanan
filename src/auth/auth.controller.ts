import "dotenv/config";
import { Controller, Body, Post, HttpCode, HttpStatus, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInEmployeeDto } from './dto/sign-in.dto';
import { AuthGuard } from './auth.guard';
import { CreateEmployeeDto } from 'src/employee/dto/create-employee.dto';
import { EmployeeService } from 'src/employee/employee.service';
import { Role } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private employeeService: EmployeeService) { }

  @Post('signin-employee')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInEmployeeDto: SignInEmployeeDto) {
    return this.authService.signInEmployee(signInEmployeeDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getprofile(@Request() req) {
    return req.user;
  }

  @Post('employee-register')
  createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    const { STAFF_ROLE, ADMIN_ROLE } = process.env;
    // Always assign a valid Role, default to STAFF if not ADMIN
    const role = createEmployeeDto.kodeRole === ADMIN_ROLE ? Role.ADMIN : Role.STAFF;
    const { kodeRole, ...dtoWithoutKodeRole } = createEmployeeDto;
    return this.employeeService.create({ ...dtoWithoutKodeRole, role });
  }
}