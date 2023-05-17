import { SetMetadata } from '@nestjs/common';
import { MetadataKey, UserRole } from '../../../constants/enums';

export const Roles = (...roles: UserRole[]) => {
  return SetMetadata(MetadataKey.REQUIRED_ROLES, roles);
};
