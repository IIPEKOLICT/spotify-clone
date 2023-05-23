import { Column, Entity } from 'typeorm';
import { EntityName, UserRole } from '../../constants/enums';
import { ApiProperty } from '@nestjs/swagger';
import { TimestampEntity } from '../../shared/entities/timestamp.entity';
import { UserStatus } from '@spotify/sockets-shared';

@Entity(EntityName.USER)
export class UserEntity extends TimestampEntity {
  @ApiProperty()
  @Column({ name: 'first_name', default: '' })
  firstName: string;

  @ApiProperty()
  @Column({ name: 'last_name', default: '' })
  lastName: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ApiProperty({ type: 'string | null' })
  @Column({ name: 'profile_picture', nullable: true })
  profilePicture: string | null;

  @ApiProperty()
  @Column({ default: UserRole.USER })
  role: UserRole;

  @ApiProperty()
  @Column({ name: 'is_banned', default: false })
  isBanned: boolean;

  @ApiProperty({ type: 'online | offline' })
  @Column({ default: UserStatus.OFFLINE })
  status: UserStatus;

  @ApiProperty()
  @Column({ name: 'last_activity_at', nullable: true })
  lastActivityAt: Date | null;
}
