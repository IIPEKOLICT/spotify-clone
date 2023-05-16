import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { EntityName } from '../../constants/enums';
import { ApiProperty } from '@nestjs/swagger';

@Entity(EntityName.USER)
export class UserEntity extends BaseEntity {
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
  @Column({ default: false })
  isAdmin: boolean;
}
