import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateTodoInput } from './create-todo.input';

@InputType()
export class UpdateTodoInput extends PartialType(CreateTodoInput) {
  @Field(() => String)
  id: string;

  @Field(() => Boolean, { nullable: true })
  completed?: boolean;
}
