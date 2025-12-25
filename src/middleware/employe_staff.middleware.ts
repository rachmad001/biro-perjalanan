import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { jwtConstants } from '../auth/constants';

@Injectable()
export class EmployeStaffMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new ForbiddenException('No token provided');
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded: any = this.jwtService.verify(token, { secret: jwtConstants.secret });
      req['user'] = decoded.user;
      req['user_type'] = decoded.type;
      if (decoded && decoded.type === 'employee') {
        next();
      } else {
        throw new ForbiddenException('Forbidden: Not an employee');
      }
    } catch (err) {
      throw new ForbiddenException('Invalid token');
    }
  }
}
