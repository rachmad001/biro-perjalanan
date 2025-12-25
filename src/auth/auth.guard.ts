import {
    CanActivate, ExecutionContext,
    Injectable, UnauthorizedException, ForbiddenException, SetMetadata
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';

// Role detector decorator
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException('No token provided');
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret,
            });
            request['user'] = payload.user;
            request['user_type'] = payload.type;

            // Role detector logic
            // const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            //     context.getHandler(),
            //     context.getClass(),
            // ]);
            // if (requiredRoles && requiredRoles.length > 0) {
            //     const userRole = payload.user?.role;
            //     if (!requiredRoles.includes(userRole)) {
            //         throw new ForbiddenException('Insufficient role');
            //     }
            // }
        } catch (error) {
            if (error instanceof ForbiddenException) throw error;
            throw new UnauthorizedException('Invalid token');
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}