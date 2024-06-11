import { Injectable } from '@nestjs/common';

import { UserEntity } from '../../../database/entity/user.entity';
import { UserMapper } from '../../user/services/user.mapper';
import { AuthResDto } from '../dto/res/auth.res.dto';
import { TokenPairResDto } from '../dto/res/token-pair.res.dto';
import { ITokenPair } from '../interfaces/token-pair.interface';
import { IUserData } from '../interfaces/user-data.interface';

@Injectable()
export class AuthMapper {
  public static toResponseDTO(
    user: UserEntity,
    tokenPair: ITokenPair,
  ): AuthResDto {
    return {
      tokens: {
        accesToken: tokenPair.accesToken,
        refreshToken: tokenPair.refreshToken,
      },
      user: UserMapper.toResponseDTO(user),
    };
  }
  public static toUserDataDTO(user: UserEntity, deviceId: string): IUserData {
    return {
      userId: user.id,
      email: user.email,
      deviceId,
    };
  }
  public static toRefreshDTO(tokenPair: ITokenPair): TokenPairResDto {
    return {
      accesToken: tokenPair.accesToken,
      refreshToken: tokenPair.refreshToken,
    };
  }
}
