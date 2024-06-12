import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';

import { TagEntity } from '../../../database/entity/tag.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ArticleRepository } from '../../repository/services/article.repository';
import { TagRepository } from '../../repository/services/tag.repository';
import { CreateArticleReqDto } from '../dto/req/create-article.req.dto';
import { ArticleResDto } from '../dto/res/article.res.dto';
import { ArticleMapper } from './article.mapper';

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly tagRepository: TagRepository,
  ) {}

  public async create(
    userData: IUserData,
    dto: CreateArticleReqDto,
  ): Promise<ArticleResDto> {
    const tags = await this.createTag(dto.tags);

    const article = await this.articleRepository.save(
      this.articleRepository.create({
        ...dto,
        user_id: userData.userId,
        tags,
      }),
    );

    return ArticleMapper.toResponseDTO(article);
  }

  private async createTag(tags: string[]): Promise<TagEntity[]> {
    if (!tags || tags.length === 0) return [];

    const entities = await this.tagRepository.findBy({ name: In(tags) });
    const existingTags = new Set(entities.map((tag) => tag.name));
    const newTags = tags.filter((tag) => !existingTags.has(tag));

    const newEntities = await this.tagRepository.save(
      newTags.map((name) => this.tagRepository.create({ name })),
    );

    return [...entities, ...newEntities];
  }

  // public async update(
  //   userData: IUserData,
  //   dto: UpdateArticleReqDto,
  // ): Promise<ArticleResDto> {
  //   const user = await this.userRepository.findOneBy({ id: userData.userId });
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  //
  //   const UpdatedUser = await this.userRepository.save({ ...user, ...dto });
  //
  //   return ArticleMapper.toResponseDTO(UpdatedUser);
  // }
}
