import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserService } from '../../user/services/user.service';
import { SignInReqDto } from '../dto/req/sign-in.req.dto';
import { SignUpReqDto } from '../dto/req/sign-up.req.dto';
import { AuthMapper } from './auth.mapper';
import { AuthCacheService } from './auth-cache.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly refreshTokenService: RefreshTokenRepository,
    private readonly authCacheService: AuthCacheService,
  ) {}
  public async signUp(dto: SignUpReqDto): Promise<any> {
    await this.userService.isEmailExist(dto.email);

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.save(
      this.userRepository.create({ ...dto, password: hashedPassword }),
    );

    const tokenPair = await this.tokenService.generateAuthTokens({
      userId: user.id,
      deviceId: dto.deviceId,
    });
    await Promise.all([
      this.refreshTokenService.save(
        this.refreshTokenService.create({
          user_id: user.id,
          refreshToken: tokenPair.refreshToken,
          deviceId: dto.deviceId,
        }),
      ),
      this.authCacheService.saveToken(
        tokenPair.accesToken,
        user.id,
        dto.deviceId,
      ),
    ]);
    return await AuthMapper.toResponseDTO(user, tokenPair);
  }

  public async signIn(dto: SignInReqDto): Promise<any> {
    return `This action adds a new ${dto} auth`;
  }
}
