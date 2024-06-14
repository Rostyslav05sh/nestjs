import { Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { TagResDto } from './dto/res/tag.res.dto';
import { TagService } from './services/tag.service';

@ApiBearerAuth()
@ApiTags('Tags')
@Controller('tags')
export class TagController {
  constructor(private readonly articleService: TagService) {}
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Get()
  public async getPopular(): Promise<TagResDto[]> {
    return await this.articleService.getPopular();
  }
}
