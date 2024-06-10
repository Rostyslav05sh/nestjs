import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';

import { JWTConfig } from '../../../configs/config.type';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class AuthCacheService {
  private readonly jwtConfig: JWTConfig;
  constructor(
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
  ) {
    this.jwtConfig = configService.get<JWTConfig>('jwt');
  }

  public async saveToken(
    token: string,
    userId: string,
    deviceId: string,
  ): Promise<void> {
    const key = `ACCESS_TOKEN:${userId}:${deviceId}`;

    await this.redisService.deleteByKey(key);
    await this.redisService.addOneToSet(key, token);
    await this.redisService.expire(key, this.jwtConfig.accesExpiresIn);
  }
}
