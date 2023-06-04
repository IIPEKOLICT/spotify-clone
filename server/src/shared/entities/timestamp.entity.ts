import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, ObjectId, ObjectIdColumn, UpdateDateColumn } from 'typeorm';

export class TimestampEntity {
  @ApiProperty({ type: String })
  @ObjectIdColumn()
  readonly _id: ObjectId;

  @ApiProperty()
  @CreateDateColumn({ nullable: false, update: false })
  readonly createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ nullable: false })
  readonly updatedAt: Date;

  get id(): ObjectId {
    return this._id;
  }
}
