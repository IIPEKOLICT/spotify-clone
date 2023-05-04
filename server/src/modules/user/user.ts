import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { ENTITY } from '../../constants/enums';

@Entity(ENTITY.USER)
export class User extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column({ name: 'first_name', default: '' })
  firstName: string;

  @Column({ name: 'last_name', default: '' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'profile_picture', nullable: true })
  profilePicture: string | null;
}
