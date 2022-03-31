import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserResponseDto } from './dto/create-user-response.dto';
import { User } from './schemas/user.schema';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  async getProfile(
    @Param('id') userId: string,
    @Request() req,
  ): Promise<CreateUserResponseDto> {
    return req.user;
  }

  @Get('users')
  async listUsers(): Promise<CreateUserResponseDto[]> {
    const users = await this.userService.getAllUsers();
    return users.map((user: User) => this.userService.transform(user));
  }
}
