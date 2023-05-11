import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RoleEntity } from '../entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from '../../../shared/services/crud.service';
import { EntityName } from '../../../constants/enums';

@Injectable()
export class RoleService extends CrudService<RoleEntity> {
  constructor(@InjectRepository(RoleEntity) repository: Repository<RoleEntity>) {
    super(repository, EntityName.ROLE);
  }
}
