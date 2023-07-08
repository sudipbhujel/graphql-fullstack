import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(data: Partial<User>) {
    const user = new this.userModel(data);

    return (await user.save())?.toObject();
  }

  async findByEmail(email: string) {
    return (await this.userModel.findOne({ email }).exec())?.toObject();
  }

  async findById(id: string) {
    return (await this.userModel.findById(id).exec())?.toObject();
  }
}
