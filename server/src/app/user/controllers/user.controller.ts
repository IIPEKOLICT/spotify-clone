import { Controller, Get } from '@nestjs/common';
import { ApiOperationDescription, Endpoint, Permission } from '../../../constants/enums';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequiredPermissions } from '../../auth/decorators/reuired-permissions.decorator';

@ApiTags(Endpoint.USERS)
@Controller(Endpoint.USERS)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ description: ApiOperationDescription.USERS_GET_ALL })
  @ApiResponse({ type: [UserEntity] })
  @RequiredPermissions(Permission.CAN_OPEN_ADMIN_PANEL)
  @Get()
  getAll(): Promise<UserEntity[]> {
    return this.userService.getAll();
  }
}
