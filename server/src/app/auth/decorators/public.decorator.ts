import { SetMetadata } from '@nestjs/common';
import { MetadataKey } from '../../../constants/enums';

export const Public = () => SetMetadata(MetadataKey.IS_PUBLIC_ENDPOINT, true);
