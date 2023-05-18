import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ required: false })
  readonly firstName: string | undefined;

  @ApiProperty({ required: false })
  readonly lastName: string | undefined;

  @ApiProperty({ required: false })
  readonly email: string | undefined;

  @ApiProperty({ required: false })
  readonly password: string | undefined;
}
