/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOrCreate(profile: any, accessToken: string): Promise<User> {
    const { emails, name, photos } = profile;

    const existingUser = await this.userModel.findOne({ email: emails[0].value });

    if (existingUser) return existingUser;

    const newUser = new this.userModel({
      email: emails[0].value,
      firstName: name?.givenName,
      lastName: name?.familyName,
      picture: photos && photos.length > 0 ? photos[0].value : undefined,
      accessToken,
    });

    return newUser.save();
  }
}
