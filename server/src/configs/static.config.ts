import { ServeStaticModuleOptions } from '@nestjs/serve-static';
import { STATIC_ROOT } from '../constants/configuration';

export const serveStaticModuleOptions: ServeStaticModuleOptions = {
  rootPath: STATIC_ROOT,
};
