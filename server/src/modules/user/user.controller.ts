import { Controller, Get } from '@nestjs/common';
import { ENDPOINTS } from '../../constants/enums';
import { UserService } from './user.service';
import { User } from './user';

@Controller(ENDPOINTS.USERS)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }
}
