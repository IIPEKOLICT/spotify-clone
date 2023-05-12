import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from '../../../shared/services/crud.service';
import { CryptographyService } from '../../global/cryptografy/cryptography.service';
import { EntityName } from '../../../constants/enums';

@Injectable()
export class UserService extends CrudService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) repository: Repository<UserEntity>,
    private readonly cryptographyService: CryptographyService,
  ) {
    super(repository, EntityName.USER);
  }

  async create(entity: DeepPartial<UserEntity>): Promise<UserEntity> {
    return super.create({
      ...entity,
      password: await this.cryptographyService.hash(entity.password),
    });
  }

  async createMany(entities: DeepPartial<UserEntity>[]): Promise<UserEntity[]> {
    return super.createMany(
      await Promise.all(
        entities.map(async (entity: DeepPartial<UserEntity>) => {
          return {
            ...entity,
            password: await this.cryptographyService.hash(entity.password),
          };
        }),
      ),
    );
  }
}
