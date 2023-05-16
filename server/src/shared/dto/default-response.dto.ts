import { ApiProperty } from '@nestjs/swagger';

export class DefaultResponseDto {
  @ApiProperty() readonly status: string;

  private constructor(status: string) {
    this.status = status;
  }

  static new(): DefaultResponseDto {
    return new this('ok');
  }
}
