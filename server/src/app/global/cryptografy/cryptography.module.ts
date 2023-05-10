import { Global, Module } from '@nestjs/common';
import { EnvironmentModule } from '../environment/environment.module';
import { CryptographyService } from './cryptography.service';

@Global()
@Module({
  imports: [EnvironmentModule],
  providers: [CryptographyService],
  exports: [CryptographyService],
})
export class CryptographyModule {}
