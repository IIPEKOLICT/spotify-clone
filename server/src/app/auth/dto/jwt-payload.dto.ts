import { RoleEntity } from '../../user/entities/role.entity';

export class JwtPayloadDto {
  readonly id: number;
  readonly email: string;
  readonly role: RoleEntity;
}
