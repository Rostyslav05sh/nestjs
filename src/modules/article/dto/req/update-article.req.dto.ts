import { PickType } from '@nestjs/swagger';

import { BaseArticleReqDto } from './base-article.req.dto';

export class UpdateArticleReqDto extends PickType(BaseArticleReqDto, [
  'body',
  'title',
  'description',
]) {}
