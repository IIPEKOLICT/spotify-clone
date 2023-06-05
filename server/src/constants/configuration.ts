import { join } from 'path';
import { cwd } from 'process';

export const JWT_EXPIRE_DURATION = '24h';
export const JWT_IGNORE_EXPIRATION = false;
export const STATIC_ROOT: string = join(cwd(), '../..', 'public');
