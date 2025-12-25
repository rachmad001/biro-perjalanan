import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignInEmployeeInterface } from './interfaces/signin.interface';
import { JwtService } from '@nestjs/jwt';
import { CreateTouristDto } from 'src/tourist/dto/create-tourist.dto';
import { UpdateTouristDto } from 'src/tourist/dto/update-tourist.dto';

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

  async signInTourist(signIn: SignInEmployeeInterface): Promise<any> {
    const tourist = await this.prisma.tourist.findFirst({
      where: {
        email: signIn.email,
        password: signIn.password,
      },
    });
    if (!tourist) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password, ...safeTourist } = tourist;
    const payload = { user: safeTourist, type: 'tourist' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  getProfile(user: any, user_type: string) {
    if (user_type === 'employee') {
      return this.prisma.employee.findUnique({ where: { id: user.id, deletedAt: null } });
    } else if (user_type === 'tourist') {
      return this.prisma.tourist.findUnique({ where: { id: user.id, deletedAt: null } });
    }
  }

  registerTourist(createTouristDto: CreateTouristDto) {
    return this.prisma.tourist.create({
      data: createTouristDto,
    });
  }

  editTourist(touristId: number, updateTouristDto: UpdateTouristDto, reqType: string) {
    if (reqType !== 'tourist') {
      throw new BadRequestException('only tourist');
    }
    return this.prisma.tourist.update({
      where: { id: touristId, deletedAt: null },
      data: updateTouristDto,
    });
  }

  findAllEmployees() {
    return this.prisma.employee.findMany();
  }

  findEmployeeById(id: number) {
    return this.prisma.employee.findUnique({ where: { id } });
  }
}
