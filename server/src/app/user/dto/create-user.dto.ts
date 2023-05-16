import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ default: '' })
  readonly firstName: string = '';

  @ApiProperty({ default: '' })
  readonly lastName: string = '';

  @ApiProperty({ required: true })
  readonly email: string;

  @ApiProperty({ required: true })
  readonly password: string;

  @ApiProperty({ default: false })
  readonly isAdmin: boolean = false;
}
