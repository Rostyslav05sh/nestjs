import { Injectable } from '@nestjs/common';

import { LoggerService } from '../logger/logger.service';
import { CreateUserReqDto } from './dto/req/create-user.req.dto';
import { UpdateUserReqDto } from './dto/req/update-user.req.dto';

@Injectable()
export class UserService {
  constructor(private readonly logger: LoggerService) {}
  public async create(createUserDto: CreateUserReqDto): Promise<any> {
    this.logger.log('This action adds a new user');
    throw new Error('This action adds a new user');
    return `This action adds a new ${createUserDto} user`;
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
