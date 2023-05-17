import { UserRole } from '../../../constants/enums';

export class JwtPayloadDto {
  readonly id: number;
  readonly email: string;
  readonly role: UserRole;
}
