import { Injectable } from '@nestjs/common';

import { UserEntity } from '../../../database/entity/user.entity';
import { UserMapper } from '../../user/services/user.mapper';
import { AuthResDto } from '../dto/res/auth.res.dto';
import { ITokenPair } from '../interfaces/token-pair.interface';

@Injectable()
export class AuthMapper {
  public static async toResponseDTO(
    user: UserEntity,
    tokenPair: ITokenPair,
  ): Promise<AuthResDto> {
    return {
      tokens: {
        accesToken: tokenPair.accesToken,
        refreshToken: tokenPair.refreshToken,
      },
      user: UserMapper.toResponseDTO(user),
    };
  }
}
