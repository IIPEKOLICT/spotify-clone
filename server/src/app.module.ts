import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentModule } from './modules/global/environment/environment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleAsyncOptions } from './configs/typeorm.config';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [EnvironmentModule, TypeOrmModule.forRootAsync(typeOrmModuleAsyncOptions), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
