import { Column, Entity, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TimestampEntity } from '../../shared/entities/timestamp.entity';
import { UserEntity } from '../user/user.entity';
import { EntityName } from '../../constants/enums';

@Entity(EntityName.POST)
export class PostEntity extends TimestampEntity {
  @ApiProperty()
  @ManyToOne(() => UserEntity, { cascade: true })
  user: UserEntity;

  @ApiProperty()
  @Column()
  text: string;
}
