import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from 'src/user/entities/user.entity';

@ObjectType()
export class AuthEntity extends UserEntity {
  @Field(() => String, { description: 'User jwt' })
  jwt?: string;
}
