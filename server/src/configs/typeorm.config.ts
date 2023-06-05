import { EnvironmentService } from '../app/global/environment/environment.service';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentModule } from '../app/global/environment/environment.module';

const typeormModuleOptionsFactory = (environmentService: EnvironmentService): TypeOrmModuleOptions => {
  return {
    type: 'mongodb',
    url: environmentService.DATABASE_URL,
    autoLoadEntities: true,
    synchronize: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };
};

export const typeOrmModuleAsyncOptions: TypeOrmModuleAsyncOptions = {
  imports: [EnvironmentModule],
  useFactory: typeormModuleOptionsFactory,
  inject: [EnvironmentService],
};
