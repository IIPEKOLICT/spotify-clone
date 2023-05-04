import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HeathCheckDto } from './shared/dto/heath-check.dto';

@ApiTags('main')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ description: 'get backend status' })
  @ApiResponse({ type: HeathCheckDto })
  @Get('status')
  healthCheck(): HeathCheckDto {
    return this.appService.healthCheck();
  }
}
