import { Injectable } from '@nestjs/common';

import { LoggerService } from '../logger/logger.service';
import { UserRepository } from '../repository/services/user.repository';
import { CreateUserReqDto } from './dto/req/create-user.req.dto';
import { UpdateUserReqDto } from './dto/req/update-user.req.dto';

@Injectable()
export class UserService {
  private _createUserDto: CreateUserReqDto;
  constructor(
    private readonly logger: LoggerService,
    private readonly userRepository: UserRepository,
  ) {}

  public async create(createUserDto: CreateUserReqDto): Promise<any> {
    this._createUserDto = createUserDto;
    return await this.userRepository.save({
      email: 'ffd',
      password: 'tesfffdt1',
      name: 'testfd1',
    });
  }

  public async findAll(): Promise<any> {
    return `This action returns all user`;
  }

  public async findOne(id: string): Promise<any> {
    return `This action returns a #${id} user`;
  }

  public async update(
    id: string,
    updateUserDto: UpdateUserReqDto,
  ): Promise<any> {
    return `This action updates a #${id} and ${updateUserDto} user`;
  }

  public async remove(id: string): Promise<any> {
    return `This action removes a #${id} user`;
  }
}
