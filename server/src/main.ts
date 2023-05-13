import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentService } from './app/global/environment/environment.service';
import { injectSwaggerToApp } from './configs/swagger.config';
import { initDatabase } from './functions/init-db.function';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = app.get(EnvironmentService).PORT;

  app.use(cookieParser());
  app.enableCors({ origin: 'http://localhost:3000', credentials: true });

  injectSwaggerToApp(app);

  await app.listen(PORT, () => {
    console.log(`Backend started at port ${PORT}`);
    initDatabase(app);
  });
}

bootstrap();
