import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { ApiOperationSummary, Endpoint } from '../../constants/enums';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/public.decorator';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { RegisterDto } from './dto/register.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../user/decorators/user.decorator';
import { Response } from 'express';
import { BadRequestError } from '../../errors/bad-request.error';
import { UserMapper } from '../user/mappers/user.mapper';
import { DefaultResponseDto } from '../../shared/dto/default-response.dto';
import { SocketService } from '../global/socket/socket.service';
import { UserStatus } from '@yumasoft-spotify/socket-sdk';

@ApiTags(Endpoint.AUTH)
@Controller(Endpoint.AUTH)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly userMapper: UserMapper,
    private readonly socketService: SocketService,
  ) {}

  @ApiOperation({ summary: ApiOperationSummary.AUTH_REFRESH_TOKEN })
  @ApiResponse({ type: UserEntity })
  @Get('refresh')
  async updateToken(@User() user: UserEntity, @Res({ passthrough: true }) response: Response): Promise<UserEntity> {
    const updatedUser: UserEntity = await this.userService.updateById(user.id, { status: UserStatus.ONLINE });

    this.socketService.dynamic.userStatusOnUserPage.triggerEditEvent(updatedUser.id.toString(), {
      value: UserStatus.ONLINE,
    });

    this.authService.injectJwtTokenIntoResponseCookies(response, updatedUser);
    return this.userMapper.mapOne(updatedUser);
  }

  @ApiOperation({ summary: ApiOperationSummary.AUTH_LOGIN })
  @ApiResponse({ type: UserEntity })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@User() user: UserEntity, @Res({ passthrough: true }) response: Response): Promise<UserEntity> {
    const updatedUser: UserEntity = await this.userService.updateById(user.id, { status: UserStatus.ONLINE });

    this.socketService.dynamic.userStatusOnUserPage.triggerEditEvent(updatedUser.id.toString(), {
      value: UserStatus.ONLINE,
    });

    this.authService.injectJwtTokenIntoResponseCookies(response, updatedUser);
    return this.userMapper.mapOne(updatedUser);
  }

  @ApiOperation({ summary: ApiOperationSummary.AUTH_REGISTER })
  @ApiResponse({ type: UserEntity })
  @Public()
  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Res({ passthrough: true }) response: Response, @Body() dto: RegisterDto): Promise<UserEntity> {
    const isExistsWithThisEmail: boolean = await this.userService.isExists({ email: dto.email });

    if (isExistsWithThisEmail) {
      throw new BadRequestError('User with this email already exists');
    }

    const user: UserEntity = await this.userService.create({ ...dto, status: UserStatus.ONLINE });

    this.socketService.dynamic.userStatusOnUserPage.triggerEditEvent(user.id.toString(), { value: UserStatus.ONLINE });
    this.authService.injectJwtTokenIntoResponseCookies(response, user);
    return this.userMapper.mapOne(user);
  }

  @ApiOperation({ summary: ApiOperationSummary.AUTH_LOGOUT })
  @ApiResponse({ type: DefaultResponseDto })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@User() user: UserEntity, @Res({ passthrough: true }) response: Response): Promise<DefaultResponseDto> {
    const updatedUser: UserEntity = await this.userService.updateById(user.id, {
      status: UserStatus.OFFLINE,
      lastActivityAt: new Date(),
    });

    this.socketService.dynamic.userStatusOnUserPage.triggerEditEvent(updatedUser.id.toString(), {
      value: UserStatus.OFFLINE,
    });

    this.authService.removeJwtTokenFromResponseCookies(response);
    return DefaultResponseDto.new();
  }

  @ApiOperation({ summary: ApiOperationSummary.AUTH_CANCEL_SESSION })
  @ApiResponse({ type: DefaultResponseDto })
  @Post('cancel-session')
  @HttpCode(HttpStatus.OK)
  async cancelSession(
    @User() user: UserEntity,
    @Res({ passthrough: true }) response: Response,
  ): Promise<DefaultResponseDto> {
    console.log(`User ${user.id} canceled session`);

    const updatedUser: UserEntity = await this.userService.updateById(user.id, {
      status: UserStatus.OFFLINE,
      lastActivityAt: new Date(),
    });

    this.socketService.dynamic.userStatusOnUserPage.triggerEditEvent(updatedUser.id.toString(), {
      value: UserStatus.OFFLINE,
    });

    return DefaultResponseDto.new();
  }
}
