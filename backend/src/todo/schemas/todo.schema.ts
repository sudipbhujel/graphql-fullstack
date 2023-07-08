import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;

@ObjectType()
@Schema({
  timestamps: true,
  toJSON: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transform(_doc, ret, _options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
    virtuals: true,
  },
  toObject: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transform(_doc, ret, _options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
    virtuals: true,
  },
})
export class Todo {
  @Field(() => String, { description: 'Todo id' })
  id: string;

  @Field(() => String, { description: 'Todo first name' })
  @Prop({ type: String, required: true, index: 'text' })
  title: string;

  @Field(() => String, { description: 'Todo description' })
  @Prop({ type: String, required: true, index: 'text' })
  description: string;

  @Field(() => Boolean, { description: 'Todo is completed' })
  @Prop({ type: Boolean, default: false })
  completed: boolean;

  @Field(() => String, { description: 'Todo userid' })
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  userId: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
