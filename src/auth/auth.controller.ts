import "dotenv/config";
import { Controller, Body, Post, HttpCode, HttpStatus, UseGuards, Get, Request, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInEmployeeDto } from './dto/sign-in.dto';
import { AuthGuard } from './auth.guard';
import { CreateEmployeeDto } from 'src/employee/dto/create-employee.dto';
import { EmployeeService } from 'src/employee/employee.service';
import { Role } from '@prisma/client';
import { CreateTouristDto } from "src/tourist/dto/create-tourist.dto";
import { UpdateTouristDto } from "src/tourist/dto/update-tourist.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";

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
    return this.authService.getProfile(req.user, req.user_type);
  }

  @Post('employee-register')
  createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    const { STAFF_ROLE, ADMIN_ROLE } = process.env;
    // Always assign a valid Role, default to STAFF if not ADMIN
    const role = createEmployeeDto.kodeRole === ADMIN_ROLE ? Role.ADMIN : Role.STAFF;
    const { kodeRole, ...dtoWithoutKodeRole } = createEmployeeDto;
    return this.employeeService.create({ ...dtoWithoutKodeRole, role });
  }

  @Post('signin-tourist')
  @HttpCode(HttpStatus.OK)
  signInTourist(@Body() signInEmployeeDto: SignInEmployeeDto) {
    return this.authService.signInTourist(signInEmployeeDto);
  }

  @Post('tourist-register')
  createTourist(@Body() createTouristDto: CreateTouristDto) {
    return this.authService.registerTourist(createTouristDto);
  }

  // @Get('employees')
  // getAllEmployees() {
  //   return this.authService.findAllEmployees();
  // }

  @UseGuards(AuthGuard)
  @Put('edit-tourist')
  editTourist(@Request() req, @Body() updateTouristDto: UpdateTouristDto) {
    return this.authService.editTourist(req.user.id, updateTouristDto, req.user_type);
  }

  @UseGuards(AuthGuard)
  @Put('edit-employee')
  editEmployee(@Request() req, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.authService.editEmployee(req.user.id, updateEmployeeDto, req.user_type);
  }
}