import { Controller, Get } from '@nestjs/common';
import { ApiOperationDescription, Endpoint } from '../../constants/enums';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminEndpoint } from '../auth/decorators/admin-endpoint.decorator';

@ApiTags(Endpoint.USERS)
@Controller(Endpoint.USERS)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ description: ApiOperationDescription.USERS_GET_ALL })
  @ApiResponse({ type: [UserEntity] })
  @AdminEndpoint()
  @Get()
  getAll(): Promise<UserEntity[]> {
    return this.userService.getAll();
  }
}
