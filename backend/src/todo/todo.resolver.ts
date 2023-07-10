import { JwtAuthGuard, User, UserContext } from '@/auth/guards/jwt-auth.guard';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { TodoEntity } from './entities/todo.entity';
import { TodoService } from './todo.service';

@UseGuards(JwtAuthGuard)
@Resolver(() => TodoEntity)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation(() => TodoEntity)
  createTodo(
    @Args('data') createTodoInput: CreateTodoInput,
    @UserContext() user: User,
  ) {
    return this.todoService.create({ ...createTodoInput, userId: user.id });
  }

  @Query(() => [TodoEntity], { name: 'todos' })
  async findAll() {
    const todos = await this.todoService.findAll();
    return todos;
  }

  @Query(() => TodoEntity, { name: 'todo' })
  findOne(
    @Args('id', { type: () => String }) id: string,
    @UserContext() user: User,
  ) {
    return this.todoService.findOneOfUser(id, user.id);
  }

  @Mutation(() => TodoEntity)
  updateTodo(
    @Args('data') updateTodoInput: UpdateTodoInput,
    @UserContext() user: User,
  ) {
    const todo = this.todoService.findOneOfUser(updateTodoInput.id, user.id);

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return this.todoService.updateOneOfUser(
      updateTodoInput.id,
      updateTodoInput,
    );
  }

  @Mutation(() => TodoEntity)
  removeTodo(
    @Args('id', { type: () => String }) id: string,
    @UserContext() user: User,
  ) {
    const todo = this.todoService.findOneOfUser(id, user.id);

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return this.todoService.remove(id);
  }
}
