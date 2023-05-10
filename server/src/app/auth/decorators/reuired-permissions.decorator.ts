import { SetMetadata } from '@nestjs/common';
import { METADATA_KEY, PERMISSION } from '../../../constants/enums';

export const RequiredPermissions = (...permissions: PERMISSION[]) => {
  return SetMetadata(METADATA_KEY.REQUIRED_PERMISSIONS, permissions);
};
