/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */

// admin ke baad wala code 
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Find or create a user (Google OAuth)
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
      role: 'user', // Default role
      isActive: true // Default status
    });

    return newUser.save();
  }

  // Get all users
  async getAllUsers() {
    return this.userModel.find();
  }

  async createUser(userData: Partial<User>) {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  // Find user by email
  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  // Update user role (user <-> admin)
  async updateUserRole(id: string, role: string) {
    return this.userModel.findByIdAndUpdate(id, { role }, { new: true });
  }

  // Enable or disable a user
  async toggleUserStatus(id: string, isActive: boolean) {
    return this.userModel.findByIdAndUpdate(id, { isActive }, { new: true });
  }

  // Get all admin users
  async getAdmins() {
    return this.userModel.find({ role: 'admin' }).exec();
  }
}


