import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HeathCheckDto } from './shared/dto/heath-check.dto';
import { API_OPERATION } from './constants/enums';

@ApiTags('main')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ description: API_OPERATION.MAIN_STATUS })
  @ApiResponse({ type: HeathCheckDto })
  @Get('status')
  healthCheck(): HeathCheckDto {
    return this.appService.healthCheck();
  }
}
