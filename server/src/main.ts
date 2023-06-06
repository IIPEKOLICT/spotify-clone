import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentService } from './app/global/environment/environment.service';
import { injectSwaggerToApp } from './configs/swagger.config';
import * as cookieParser from 'cookie-parser';
import { INestApplication } from '@nestjs/common';
import { corsOptionsFactory } from './configs/cors.config';
import { initDatabaseHook } from './hooks/init-database.hook';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  const environmentService: EnvironmentService = app.get(EnvironmentService);

  app.use(cookieParser());
  app.enableCors(corsOptionsFactory(environmentService.FRONTEND_ORIGIN));

  injectSwaggerToApp(app);

  await app.listen(environmentService.PORT, () => {
    initDatabaseHook(app).then(() => console.log(`Backend started at port ${environmentService.PORT}`));
  });
}

bootstrap();
