import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class TimestampEntity {
  @ApiProperty()
  @CreateDateColumn({ name: 'created_at', nullable: false, update: false })
  readonly createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at', nullable: false, update: false })
  readonly updatedAt: Date;
}
