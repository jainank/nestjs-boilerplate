import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login.response.dto';
import { LoginRequestDto } from './dto/login.request.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() body: LoginRequestDto,
    @Request() req,
  ): Promise<LoginResponseDto> {
    return this.authService.login(req.user);
  }
}
