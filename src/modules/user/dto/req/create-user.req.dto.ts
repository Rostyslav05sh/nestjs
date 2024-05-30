import { Transform, Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  Matches,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';

const date = new Date();

class carReqDto {
  @IsString()
  @Transform(TransformHelper.trim)
  @Length(3, 20)
  brand: string;

  @IsNumber()
  @Type(() => Number)
  @Max(date.getFullYear())
  @Min(1984)
  year: number;

  @IsString()
  @Transform(TransformHelper.trim)
  @Transform(TransformHelper.toLowerCase)
  @Length(3, 50)
  model: string;
}

export class CreateUserReqDto {
  @IsString()
  @Length(3, 25)
  @Transform(TransformHelper.trim)
  public readonly name: string;

  @IsString()
  @Length(3, 25)
  @Transform(TransformHelper.trim)
  @Matches(/^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
    message:
      'must contain Upper and Lower case letter, number and special symbol',
  })
  public readonly password: string;

  @IsString()
  @Max(100)
  @Transform(TransformHelper.trim)
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
  public readonly email: string;

  @IsString()
  @Max(255)
  @IsOptional()
  public readonly avatar?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Max(110)
  @Min(16)
  public readonly age?: number;

  @IsOptional()
  @IsObject()
  @Type(() => carReqDto)
  @ValidateNested({ each: true })
  public readonly car: carReqDto;
}
