import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

type StaticOrigin = boolean | string | RegExp | (string | RegExp)[];

const originMatcherFactory = (allowedOrigins: string[]): CorsOptions['origin'] => {
  return (origin: string | undefined, callback: (error: Error | null, origin?: StaticOrigin) => void) => {
    if (origin === undefined) {
      return callback(null, true);
    }

    if (!origin || allowedOrigins.every((allowedOrigin: string) => !origin.startsWith(allowedOrigin))) {
      return callback(new Error(`Request from origin '${origin}' is not allowed by CORS`));
    }

    callback(null, true);
  };
};

export const corsOptionsFactory = (frontendOrigin: string): CorsOptions => {
  const allowedOrigins: string[] = ['http://localhost', frontendOrigin];

  return {
    origin: originMatcherFactory(allowedOrigins),
    credentials: true,
  };
};
