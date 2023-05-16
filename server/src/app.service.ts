import { Injectable } from '@nestjs/common';
import { DefaultResponseDto } from './shared/dto/default-response.dto';

@Injectable()
export class AppService {
  healthCheck(): DefaultResponseDto {
    return DefaultResponseDto.new();
  }
}
