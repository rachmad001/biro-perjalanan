import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { jwtConstants } from '../auth/constants';

@Injectable()
export class PublicMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new BadRequestException('You must be logged in, no auth');
      // return res.status(401).json({ message: 'You must be logged in' });
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded: any = this.jwtService.verify(token, { secret: jwtConstants.secret });
      req['user'] = decoded.user;
      req['user_type'] = decoded.type;
      if (decoded) {
        if (decoded.type === 'tourist') {
          next();
        } else {
          return res.status(401).json({ message: 'You must be logged in as tourist' });
        }
      } else {
        return res.status(401).json({ message: 'You must be logged in' });
      }
    } catch (err) {

      return res.status(401).json({ message: 'You must be logged in' });
    }
  }
}
