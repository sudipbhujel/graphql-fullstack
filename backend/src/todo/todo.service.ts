import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateTodoInput } from './dto/update-todo.input';
import { Todo, TodoDocument } from './schemas/todo.schema';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(data: Partial<Todo>) {
    const user = new this.todoModel(data);

    return (await user.save())?.toObject();
  }

  async findAllOfUser(userId: string) {
    return (await this.todoModel.find({ userId })).map((doc) => doc.toObject());
  }

  async findAll() {
    return (await this.todoModel.find()).map((doc) => doc.toObject());
  }

  async findOneOfUser(id: string, userId: string) {
    return (await this.todoModel.findOne({ _id: id, userId }))?.toObject();
  }

  async updateOneOfUser(id: string, data: UpdateTodoInput) {
    return (
      await this.todoModel.findOneAndUpdate({ _id: id }, data, { new: true })
    ).toObject();
  }

  async remove(id: string) {
    return (await this.todoModel.findByIdAndRemove(id)).toObject();
  }
}
