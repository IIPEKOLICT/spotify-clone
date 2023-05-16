import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ required: false, type: String })
  readonly firstName: string | undefined;

  @ApiProperty({ required: false, type: String })
  readonly lastName: string | undefined;

  @ApiProperty({ required: false, type: String })
  readonly email: string | undefined;

  @ApiProperty({ required: false, type: String })
  readonly password: string | undefined;
}
