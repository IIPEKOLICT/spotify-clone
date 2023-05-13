import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityName, Permission } from '../../../constants/enums';
import { ApiProperty } from '@nestjs/swagger';

@Entity(EntityName.ROLE)
export class RoleEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ApiProperty()
  @Column({ name: 'can_add_songs', default: false })
  [Permission.CAN_ADD_SONGS]: boolean;

  @ApiProperty()
  @Column({ name: 'can_add_playlists', default: false })
  [Permission.CAN_ADD_PLAYLISTS]: boolean;

  @ApiProperty()
  @Column({ name: 'can_open_admin_panel', default: false })
  [Permission.CAN_OPEN_ADMIN_PANEL]: boolean;
}
