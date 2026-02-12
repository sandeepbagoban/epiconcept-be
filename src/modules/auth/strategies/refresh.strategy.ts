import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface RefreshTokenPayload {
  sub: string;
  email: string;
  tenantId: string;
  type: 'refresh';
  iat: number;
  exp: number;
}

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.REFRESH_JWT_SECRET || '',
      ignoreExpiration: false,
    });
  }

  validate(payload: RefreshTokenPayload) {
    // Ensure token is actually a refresh token
    if (payload.type !== 'refresh') {
      throw new UnauthorizedException('Invalid token type');
    }

    return {
      id: payload.sub,
      email: payload.email,
      tenantId: payload.tenantId,
    };
  }
}
