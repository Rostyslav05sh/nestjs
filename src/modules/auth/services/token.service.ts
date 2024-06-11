import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { JwtService } from '@nestjs/jwt';

import { JWTConfig } from '../../../configs/config.type';
import { TokenTypeEnum } from '../enums/token-type.enum';
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
      secret: this.jwtConfig.accesSecret,
      expiresIn: this.jwtConfig.accesExpiresIn,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfig.refreshSecret,
      expiresIn: this.jwtConfig.refreshExpiresIn,
    });
    return { accesToken, refreshToken };
  }

  public async verifyToken(
    token: string,
    type: TokenTypeEnum,
  ): Promise<IJWTPayload> {
    return await this.jwtService.verifyAsync(token, {
      secret: this.getSecret(type),
    });
  }

  private getSecret(type: TokenTypeEnum): string {
    let secret;
    switch (type) {
      case TokenTypeEnum.ACCESS: {
        secret = this.jwtConfig.accesSecret;
        break;
      }
      case TokenTypeEnum.REFRESH: {
        secret = this.jwtConfig.refreshSecret;
        break;
      }
      default: {
        throw new Error('Unknown token type');
      }
    }
    return secret;
  }
}
