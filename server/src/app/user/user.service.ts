import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from '../../shared/services/crud.service';
import { CryptographyService } from '../cryptography/cryptography.service';
import { EntityName } from '../../constants/enums';
import { Coroutine } from '@iipekolict/coroutine';

@Injectable()
export class UserService extends CrudService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) repository: Repository<UserEntity>,
    private readonly cryptographyService: CryptographyService,
  ) {
    super(repository, EntityName.USER);
  }

  async updateById(id: number, dto: DeepPartial<UserEntity>): Promise<UserEntity> {
    if (dto.password) {
      dto.password = await this.cryptographyService.hash(dto.password);
    }

    return super.updateById(id, dto);
  }

  async create(entity: DeepPartial<UserEntity>): Promise<UserEntity> {
    return super.create({
      ...entity,
      password: await this.cryptographyService.hash(entity.password),
    });
  }

  async createMany(entities: DeepPartial<UserEntity>[]): Promise<UserEntity[]> {
    return super.createMany(
      await Coroutine.launchArr(entities, async (entity: DeepPartial<UserEntity>) => {
        return {
          ...entity,
          password: await this.cryptographyService.hash(entity.password),
        };
      }),
    );
  }
}
