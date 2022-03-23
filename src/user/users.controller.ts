import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserResponseDto } from '../dto/create-user-response.dto';
import {User, UserDocument} from '../schemas/user.schema';

@Controller()
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('user/register')
  async register(
    @Body() createUser: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    const user = await this.userService.createUser(createUser);
    return this.userService.transform(user);
  }

  @Get('users')
  async listUsers(): Promise<CreateUserResponseDto[]> {
    const users = await this.userService.getAllUsers();
    return users.map((user: User) => this.userService.transform(user));
  }
}
