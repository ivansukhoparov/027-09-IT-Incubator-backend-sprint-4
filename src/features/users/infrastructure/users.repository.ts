import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';
import { ObjectId } from 'mongodb';
import { userMapper } from '../types/mapper';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(newUser: User) {
    const result = await this.userModel.create(newUser);
    return result._id.toString();
  }

  async deleteUser(id: string) {
    try {
      const result = await this.userModel.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount !== 1) throw new NotFoundException();
    } catch {
      throw new NotFoundException();
    }
  }

  async getUserByLoginOrEmail(loginOrEmail: string) {
    try {
      const searchKey = {
        $or: [{ login: loginOrEmail }, { email: loginOrEmail }],
      };
      const user = await this.userModel.findOne(searchKey);
      if (!user) return null;
      return user;
    } catch (err) {
      return null;
    }
  }

  async getUserById(id: string) {
    try {
      return await this.userModel.findById(id);
    } catch {
      throw new NotFoundException();
    }
  }
}