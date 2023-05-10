import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentModule } from './app/global/environment/environment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleAsyncOptions } from './configs/typeorm.config';
import { UserModule } from './app/user/user.module';
import { AuthModule } from './app/auth/auth.module';
import { CryptographyModule } from './app/global/cryptografy/cryptography.module';

@Module({
  imports: [
    EnvironmentModule,
    TypeOrmModule.forRootAsync(typeOrmModuleAsyncOptions),
    AuthModule,
    UserModule,
    CryptographyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
