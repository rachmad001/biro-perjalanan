import { Injectable, BadRequestException } from '@nestjs/common';
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

  async findOne(id: number) {
    return this.prisma.employee.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const employee = await this.prisma.employee.findUnique({ where: { id } });
    if (employee?.deletedAt) {
      throw new BadRequestException('id was removed');
    }
    return this.prisma.employee.update({
      where: { id },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    const employee = await this.prisma.employee.findUnique({ where: { id } });
    if (employee?.deletedAt) {
      throw new BadRequestException('id was removed');
    }
    
    return this.prisma.employee.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return `This action removes a #${id} employee`;
  }
}
