import { UserEntity } from '../../../database/entity/user.entity';
import { UserResDto } from '../dto/res/user.res.dto';

export class UserMapper {
  public static toResponseDTO(user: UserEntity): UserResDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      image: user.image,
      isFollowed: user.following ? user.following.length > 0 : false,
    };
  }
}
