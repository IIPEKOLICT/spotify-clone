import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './constants/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(PORT, () => console.log(`Backend started at port ${PORT}`));
}

bootstrap();
