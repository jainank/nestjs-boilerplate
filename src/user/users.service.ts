import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserResponseDto } from './dto/create-user-response.dto';

type UserModel = Model<UserDocument>;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: UserModel) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  transform(user: User): CreateUserResponseDto {
    const response: CreateUserResponseDto = new CreateUserResponseDto();
    response.fullName = user.name;
    response.email = user.email;
    response.role = user.role;
    response.id = user._id;
    return response;
  }
}
