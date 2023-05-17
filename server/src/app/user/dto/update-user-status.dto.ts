import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from '../../../constants/enums';

export class UpdateUserStatusDto {
  @ApiProperty({ required: true })
  readonly status: UserStatus;
}
