import { JwtModuleOptions, JwtModuleAsyncOptions } from '@nestjs/jwt';
import { EnvironmentService } from '../app/global/environment/environment.service';
import { JWT_EXPIRE_DURATION, JWT_IGNORE_EXPIRATION } from '../constants/configuration';

const jwtModuleOptionsFactory = (environmentService: EnvironmentService): JwtModuleOptions => {
  return {
    secret: environmentService.JWT_SECRET,
    signOptions: {
      expiresIn: JWT_EXPIRE_DURATION,
    },
    verifyOptions: {
      ignoreExpiration: JWT_IGNORE_EXPIRATION,
    },
  };
};

export const jwtModuleAsyncOptions: JwtModuleAsyncOptions = {
  useFactory: jwtModuleOptionsFactory,
  inject: [EnvironmentService],
};
