import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DefaultResponseDto } from './shared/dto/default-response.dto';
import { ApiOperationSummary } from './constants/enums';
import { Public } from './app/auth/decorators/public.decorator';

@ApiTags('main')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ description: ApiOperationSummary.MAIN_STATUS })
  @ApiResponse({ type: DefaultResponseDto })
  @Public()
  @Get('status')
  healthCheck(): DefaultResponseDto {
    return this.appService.healthCheck();
  }
}
