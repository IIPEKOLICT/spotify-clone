import { Module } from '@nestjs/common';
import { EnvironmentModule } from '../global/environment/environment.module';
import { CryptographyService } from './cryptography.service';

@Module({
  imports: [EnvironmentModule],
  providers: [CryptographyService],
  exports: [CryptographyService],
})
export class CryptographyModule {}
