import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { UserRole } from '../schemas/user.roles.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  @MaxLength(128)
  password: string;

  @MaxLength(128)
  fullName: string;

  role: UserRole;
}
