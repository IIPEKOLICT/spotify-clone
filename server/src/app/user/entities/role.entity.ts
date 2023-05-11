import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ENTITY, PERMISSION } from '../../../constants/enums';
import { ApiProperty } from '@nestjs/swagger';

@Entity(ENTITY.ROLE)
export class RoleEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ApiProperty()
  @Column({ name: 'can_add_songs', default: false })
  [PERMISSION.CAN_ADD_SONGS]: boolean;

  @ApiProperty()
  @Column({ name: 'can_add_playlists', default: false })
  [PERMISSION.CAN_ADD_PLAYLISTS]: boolean;

  @ApiProperty()
  @Column({ name: 'can_open_admin_panel', default: false })
  [PERMISSION.CAN_OPEN_ADMIN_PANEL]: boolean;
}
