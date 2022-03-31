import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class LoginRequestDto {
  static usernameField = 'email';
  static passwordField = 'password';
  @IsEmail()
  email: string;

  @MinLength(6)
  @MaxLength(128)
  password: string;
}
