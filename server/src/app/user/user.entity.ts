import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityName, UserRole, UserStatus } from '../../constants/enums';
import { ApiProperty } from '@nestjs/swagger';
import { TimestampEntity } from '../../shared/entities/timestamp.entity';

@Entity(EntityName.USER)
export class UserEntity extends TimestampEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ApiProperty()
  @Column({ name: 'first_name', default: '' })
  firstName: string;

  @ApiProperty()
  @Column({ name: 'last_name', default: '' })
  lastName: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
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

  @ApiProperty()
  @Column({ default: UserStatus.OFFLINE })
  status: UserStatus;
}
