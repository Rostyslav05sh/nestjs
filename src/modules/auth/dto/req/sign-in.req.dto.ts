import { PickType } from '@nestjs/swagger';

import { BaseAuthReqDto } from './base-auth.req.dto';

export class SignInReqDto extends PickType(BaseAuthReqDto, [
  'password',
  'email',
  'deviceId',
]) {}
