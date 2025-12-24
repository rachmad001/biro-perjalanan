import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignInEmployeeInterface } from './interfaces/signin.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signInEmployee(signIn: SignInEmployeeInterface): Promise<any> {
    const employee = await this.prisma.employee.findFirst({
      where: {
        email: signIn.email,
        password: signIn.password,
      },
    });

    if (!employee) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password, ...safeEmployee } = employee;
    const payload = { user: safeEmployee, type: 'employee' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  findAllEmployees() {
    return this.prisma.employee.findMany();
  }

  findEmployeeById(id: number) {
    return this.prisma.employee.findUnique({ where: { id } });
  }
}
