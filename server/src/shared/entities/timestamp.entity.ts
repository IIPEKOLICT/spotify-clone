import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class TimestampEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at', nullable: false, update: false })
  readonly createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at', nullable: false })
  readonly updatedAt: Date;
}
