import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { ENTITY } from '../../constants/enums';
import { ApiProperty } from '@nestjs/swagger';

@Entity(ENTITY.USER)
export class User extends BaseEntity {
  @ApiProperty()
  @PrimaryColumn()
  id: number;

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
}
