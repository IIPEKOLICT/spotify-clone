import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RoleEntity } from '../entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from '../../../shared/services/crud.service';
import { ENTITY } from '../../../constants/enums';

@Injectable()
export class RoleService extends CrudService<RoleEntity> {
  constructor(@InjectRepository(RoleEntity) repository: Repository<RoleEntity>) {
    super(repository, ENTITY.ROLE);
  }
}
