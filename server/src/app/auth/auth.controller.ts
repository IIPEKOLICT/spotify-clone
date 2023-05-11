import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { API_OPERATION, ENDPOINT, HTTP_HEADER } from '../../constants/enums';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/public.decorator';
import { AuthService } from './auth.service';
import { UserService } from '../user/services/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../user/decorators/user.decorator';
import { Response } from 'express';
import { RoleEntity } from '../user/entities/role.entity';
import { RoleService } from '../user/services/role.service';

@ApiTags(ENDPOINT.AUTH)
@Controller(ENDPOINT.AUTH)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

  @ApiOperation({ summary: API_OPERATION.AUTH_REFRESH_TOKEN })
  @ApiResponse({ type: UserEntity })
  @Get('refresh')
  async updateToken(@User() user: UserEntity, @Res({ passthrough: true }) response: Response): Promise<UserEntity> {
    response.cookie(HTTP_HEADER.AUTHORIZATION, this.authService.generateToken(user));
    return user;
  }

  @ApiOperation({ summary: API_OPERATION.AUTH_LOGIN })
  @ApiResponse({ type: UserEntity })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@User() user: UserEntity, @Res({ passthrough: true }) response: Response): Promise<UserEntity> {
    response.cookie(HTTP_HEADER.AUTHORIZATION, this.authService.generateToken(user));
    return user;
  }

  @ApiOperation({ summary: API_OPERATION.AUTH_REGISTER })
  @ApiResponse({ type: UserEntity })
  @Public()
  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Res({ passthrough: true }) response: Response, @Body() dto: CreateUserDto): Promise<UserEntity> {
    const role: RoleEntity = await this.roleService.getOne({ name: 'user' });
    const user: UserEntity = await this.userService.create({ ...dto, role });

    response.cookie(HTTP_HEADER.AUTHORIZATION, this.authService.generateToken(user));
    return user;
  }
}
