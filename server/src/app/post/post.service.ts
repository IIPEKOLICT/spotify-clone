import { Injectable } from '@nestjs/common';
import { CrudService } from '../../shared/services/crud.service';
import { PostEntity } from './post.entity';
import { DataSource } from 'typeorm';
import { EntityName } from '../../constants/enums';

@Injectable()
export class PostService extends CrudService<PostEntity> {
  constructor(protected readonly dataSource: DataSource) {
    super(dataSource, EntityName.POST);
  }
}
