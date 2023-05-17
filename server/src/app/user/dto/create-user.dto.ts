import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../../constants/enums';

export class CreateUserDto {
  @ApiProperty({ default: '' })
  readonly firstName: string = '';

  @ApiProperty({ default: '' })
  readonly lastName: string = '';

  @ApiProperty({ required: true })
  readonly email: string;

  @ApiProperty({ required: true })
  readonly password: string;

  @ApiProperty({ default: UserRole.USER })
  readonly role: UserRole = UserRole.USER;
}
