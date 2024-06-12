import { ArticleEntity } from '../../../database/entity/article.entity';
import { ArticleResDto } from '../dto/res/article.res.dto';

export class ArticleMapper {
  public static toResponseDTO(article: ArticleEntity): ArticleResDto {
    return {
      id: article.id,
      title: article.title,
      body: article.body,
      description: article.description,
      created: article.created,
      updated: article.updated,
      tags: article.tags.map((tag) => tag.name),
    };
  }
}
