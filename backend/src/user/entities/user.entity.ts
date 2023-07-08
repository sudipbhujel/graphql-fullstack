import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'User' })
export class UserEntity {
  @Field(() => String, { description: 'User id' })
  id: string;

  @Field(() => String, { description: 'User first name' })
  firstName: string;

  @Field(() => String, { description: 'User last name' })
  lastName: string;

  @Field(() => String, { description: 'User email' })
  email: string;
}
