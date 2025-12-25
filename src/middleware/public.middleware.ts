import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { jwtConstants } from '../auth/constants';

@Injectable()
export class PublicMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ message: 'You must be logged in' });
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded: any = this.jwtService.verify(token, { secret: jwtConstants.secret });
      req['user'] = decoded.user;
      req['user_type'] = decoded.type;
      if (decoded) {
        next();
      } else {
        return res.status(401).json({ message: 'You must be logged in' });
      }
    } catch (err) {
      return res.status(401).json({ message: 'You must be logged in' });
    }
  }
}
