import { Injectable } from '@nestjs/common';
import { CrudService } from '../../shared/services/crud.service';
import { PostEntity } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityName } from '../../constants/enums';

@Injectable()
export class PostService extends CrudService<PostEntity> {
  constructor(@InjectRepository(PostEntity) repository: Repository<PostEntity>) {
    super(repository, EntityName.POST);
  }
}
