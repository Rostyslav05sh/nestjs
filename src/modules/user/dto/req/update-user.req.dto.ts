import { Transform, Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { TransformHelper } from 'src/common/helpers/transform.helper';

export class UpdateUserReqDto {
  @IsString()
  @Length(3, 25)
  @Transform(TransformHelper.trim)
  public readonly name: string;
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
}
