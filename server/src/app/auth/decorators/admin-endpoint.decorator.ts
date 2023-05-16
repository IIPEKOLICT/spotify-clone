import { SetMetadata } from '@nestjs/common';
import { MetadataKey } from '../../../constants/enums';

export const AdminEndpoint = () => {
  return SetMetadata(MetadataKey.IS_ADMIN_ENDPOINT, true);
};
