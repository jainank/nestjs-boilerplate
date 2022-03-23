import { IntersectionType, OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

class CreateUserResponse {
  id?: string;
}
export class CreateUserResponseDto extends IntersectionType(
  CreateUserResponse,
  OmitType(CreateUserDto, ['password'] as const),
) {}
