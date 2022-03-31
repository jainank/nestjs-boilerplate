import mongoose, { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserResponseDto } from './dto/create-user-response.dto';
import * as bcrypt from 'bcrypt';

type UserModel = Model<UserDocument>;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: UserModel) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const hash = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hash;
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUser(id: string): Promise<User> {
    let user: User;
    if (mongoose.Types.ObjectId.isValid(id)) {
      user = await this.userModel.findById(id).exec();
    }
    if (user) {
      return user;
    }
    throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
  }

  async findOne(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new HttpException('Invalid credential', HttpStatus.UNAUTHORIZED);
    }
    return user;
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
