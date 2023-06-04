import { Column, Entity } from 'typeorm';
import { EntityName, UserRole } from '../../constants/enums';
import { ApiProperty } from '@nestjs/swagger';
import { TimestampEntity } from '../../shared/entities/timestamp.entity';
import { UserStatus } from '@yumasoft-spotify/socket-sdk';

@Entity(EntityName.USER)
export class UserEntity extends TimestampEntity {
  @ApiProperty()
  @Column({ default: '' })
  firstName: string;

  @ApiProperty()
  @Column({ default: '' })
  lastName: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  profilePicturePath?: string;

  @ApiProperty({ nullable: true })
  @Column({ nullable: true })
  profilePicture?: string;

  @ApiProperty({ enum: UserRole })
  @Column({ default: UserRole.USER })
  role: UserRole;

  @ApiProperty()
  @Column({ default: false })
  isBanned: boolean;

  @ApiProperty({ enum: UserStatus })
  @Column({ default: UserStatus.OFFLINE })
  status: UserStatus;

  @ApiProperty({ nullable: true })
  @Column({ nullable: true })
  lastActivityAt?: Date;
}
