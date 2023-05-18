import { ApiProperty } from '@nestjs/swagger';

export class CrudPostDto {
  @ApiProperty()
  readonly text: string;
}
