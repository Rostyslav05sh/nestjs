import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { ArticleListReqDto } from './dto/req/article-list.req.dto';
import { CreateArticleReqDto } from './dto/req/create-article.req.dto';
import { UpdateArticleReqDto } from './dto/req/update-article.req.dto';
import { ArticleResDto } from './dto/res/article.res.dto';
import { ArticleListResDto } from './dto/res/article-list.res.dto';
import { ArticleService } from './services/article.service';

@ApiBearerAuth()
@ApiTags('Articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Post()
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreateArticleReqDto,
  ): Promise<any> {
    return await this.articleService.create(userData, dto);
  }

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Get(':articleId')
  public async getById(
    @CurrentUser() userData: IUserData,
    @Param('articleId', ParseUUIDPipe) articleId: string,
  ): Promise<ArticleResDto> {
    return await this.articleService.getById(userData, articleId);
  }
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Delete(':articleId')
  public async delete(
    @CurrentUser() userData: IUserData,
    @Param('articleId', ParseUUIDPipe) articleId: string,
  ): Promise<void> {
    return await this.articleService.delete(userData, articleId);
  }

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Get()
  public async getList(
    @CurrentUser() userData: IUserData,
    @Query() query: ArticleListReqDto,
  ): Promise<ArticleListResDto> {
    return await this.articleService.getList(userData, query);
  }

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Put(':articleId')
  public async update(
    @CurrentUser() userData: IUserData,
    @Param('articleId') articleId: string,
    @Body() dto: UpdateArticleReqDto,
  ): Promise<ArticleResDto> {
    return await this.articleService.update(userData, articleId, dto);
  }

  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Post(':articleId/like')
  public async like(
    @CurrentUser() userData: IUserData,
    @Param('articleId', ParseUUIDPipe) articleId: string,
  ): Promise<void> {
    await this.articleService.like(userData, articleId);
  }

  @ApiBearerAuth()
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Delete(':articleId/like')
  public async unlike(
    @CurrentUser() userData: IUserData,
    @Param('articleId', ParseUUIDPipe) articleId: string,
  ): Promise<void> {
    await this.articleService.unlike(userData, articleId);
  }
}
