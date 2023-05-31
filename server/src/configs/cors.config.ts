import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

type StaticOrigin = boolean | string | RegExp | (string | RegExp)[];

const originMatcher: CorsOptions['origin'] = (
  origin: string | undefined,
  callback: (error: Error | null, origin?: StaticOrigin) => void,
) => {
  if (origin === undefined) {
    return callback(null, true);
  }

  if (!origin || !origin.startsWith('http://localhost')) {
    return callback(new Error(`Request from origin '${origin}' is not allowed by CORS`));
  }

  callback(null, true);
};

export const corsOptions: CorsOptions = {
  origin: originMatcher,
  credentials: true,
};
