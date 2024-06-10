import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { JwtService } from '@nestjs/jwt';

import { JWTConfig } from '../../../configs/config.type';
import { IJWTPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class TokenService {
  private readonly jwtConfig: JWTConfig;
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.jwtConfig = configService.get<JWTConfig>('jwt');
  }

  public async generateAuthTokens(payload: IJWTPayload) {
    const accesToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.accesToken,
      expiresIn: this.jwtConfig.accesExpiresIn,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.refreshToken,
      expiresIn: this.jwtConfig.refreshExpiresIn,
    });
    return { accesToken, refreshToken };
  }
}
