import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TodoEntity {
  @Field(() => String, { description: 'Todo id' })
  id: string;

  @Field(() => Date, { description: 'Todo creation date' })
  createdAt: Date;

  @Field(() => Date, { description: 'Todo update date' })
  updatedAt: Date;

  @Field(() => String, { description: 'Todo first name' })
  title: string;

  @Field(() => String, { description: 'Todo description' })
  description: string;

  @Field(() => Boolean, { description: 'Todo is completed' })
  completed: boolean;

  @Field(() => String, { description: 'Todo userid' })
  userId: string;
}
