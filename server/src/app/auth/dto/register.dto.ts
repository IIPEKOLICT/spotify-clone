import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ default: '' })
  readonly firstName: string = '';

  @ApiProperty({ default: '' })
  readonly lastName: string = '';

  @ApiProperty({ required: true })
  readonly email: string;

  @ApiProperty({ required: true })
  readonly password: string;
}
