import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { IUserData } from '../../auth/interfaces/user-data.interface';
import { FollowRepository } from '../../repository/services/follow.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UpdateUserReqDto } from '../dto/req/update-user.req.dto';
import { UserResDto } from '../dto/res/user.res.dto';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
  constructor(
    private readonly followRepository: FollowRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async getMe(userData: IUserData): Promise<UserResDto> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return UserMapper.toResponseDTO(user);
  }

  public async getById(userId: string): Promise<UserResDto> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return UserMapper.toResponseDTO(user);
  }
  public async update(
    userData: IUserData,
    dto: UpdateUserReqDto,
  ): Promise<UserResDto> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const UpdatedUser = await this.userRepository.save({ ...user, ...dto });

    return UserMapper.toResponseDTO(UpdatedUser);
  }

  public async remove(userData: IUserData): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    await this.userRepository.remove(user);
  }

  public async follow(userData: IUserData, userId: string): Promise<void> {
    if (userData.userId === userId) {
      throw new ConflictException('You can not follow yourself');
    }
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const follow = await this.followRepository.findOneBy({
      follower_id: userData.userId,
      following_id: userId,
    });

    if (follow) {
      throw new ConflictException('You are already following this user');
    }

    await this.followRepository.save(
      this.followRepository.create({
        follower_id: userData.userId,
        following_id: userId,
      }),
    );
  }

  public async unfollow(userData: IUserData, userId: string): Promise<void> {
    if (userData.userId === userId) {
      throw new ConflictException('You can not follow yourself');
    }
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const follow = await this.followRepository.findOneBy({
      follower_id: userData.userId,
      following_id: userId,
    });

    if (!follow) {
      throw new ConflictException('You are not following this user');
    }

    await this.followRepository.remove(follow);
  }

  public async isEmailExist(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException('Email is already taken');
    }
  }
}
