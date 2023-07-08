import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

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
export class User {
  @Field(() => String, { description: 'User id' })
  id: string;

  @Field(() => String, { description: 'User first name' })
  @Prop({ type: String, required: true, index: 'text' })
  firstName: string;

  @Field(() => String, { description: 'User last name' })
  @Prop({ type: String, required: true, index: 'text' })
  lastName: string;

  @Field(() => String, { description: 'User email' })
  @Prop({ type: String, required: true, index: 'text' })
  email: string;

  @Field(() => String, { description: 'User password' })
  @Prop({ type: String, default: null })
  password?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
