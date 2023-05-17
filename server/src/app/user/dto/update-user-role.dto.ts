import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../../constants/enums';

export class UpdateUserRoleDto {
  @ApiProperty({ required: true })
  readonly role: UserRole;
}
