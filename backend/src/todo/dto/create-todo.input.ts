import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field(() => String, { description: 'Title of the todo' })
  title: string;

  @Field(() => String, { description: 'Description of the todo' })
  description: string;
}
