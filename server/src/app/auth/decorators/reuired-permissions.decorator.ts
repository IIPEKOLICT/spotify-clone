import { SetMetadata } from '@nestjs/common';
import { MetadataKey, Permission } from '../../../constants/enums';

export const RequiredPermissions = (...permissions: Permission[]) => {
  return SetMetadata(MetadataKey.REQUIRED_PERMISSIONS, permissions);
};
