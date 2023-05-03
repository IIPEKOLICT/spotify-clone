import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentService } from './modules/global/environment/environment.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const PORT = app.get(EnvironmentService).PORT;
  await app.listen(PORT, () => console.log(`Backend started at port ${PORT}`));
}

bootstrap();
