import { Controller, Get } from '@nestjs/common';
import { API_OPERATION, ENDPOINT, PERMISSION } from '../../../constants/enums';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequiredPermissions } from '../../auth/decorators/reuired-permissions.decorator';

@ApiTags(ENDPOINT.USERS)
@Controller(ENDPOINT.USERS)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ description: API_OPERATION.USERS_GET_ALL })
  @ApiResponse({ type: [UserEntity] })
  @RequiredPermissions(PERMISSION.CAN_OPEN_ADMIN_PANEL)
  @Get()
  getAll(): Promise<UserEntity[]> {
    return this.userService.getAll();
  }
}
