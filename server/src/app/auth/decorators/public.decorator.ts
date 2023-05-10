import { SetMetadata } from '@nestjs/common';
import { METADATA_KEY } from '../../../constants/enums';

export const Public = () => SetMetadata(METADATA_KEY.IS_PUBLIC_ENDPOINT, true);
