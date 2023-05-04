import { Controller, Get } from '@nestjs/common';
import { ENDPOINTS } from '../../constants/enums';
import { UserService } from './user.service';
import { User } from './user';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(ENDPOINTS.USERS)
@Controller(ENDPOINTS.USERS)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ description: 'get all users' })
  @ApiResponse({ type: [User] })
  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }
}
