import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentService } from './app/global/environment/environment.service';
import { injectSwaggerToApp } from './configs/swagger.config';
import * as cookieParser from 'cookie-parser';
import { INestApplication } from '@nestjs/common';
import { corsOptions } from './configs/cors.config';
import { initDatabaseHook } from './hooks/init-database.hook';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  const PORT: string | number = app.get(EnvironmentService).PORT;

  app.use(cookieParser());
  app.enableCors(corsOptions);

  injectSwaggerToApp(app);

  await app.listen(PORT, () => {
    initDatabaseHook(app).then(() => console.log(`Backend started at port ${PORT}`));
  });
}

bootstrap();
