import { Injectable } from '@nestjs/common';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}
  
  create(createEmployee: Employee) {
    return this.prisma.employee.create({
      data: createEmployee,
    });
  }

  findAll() {
    return this.prisma.employee.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
