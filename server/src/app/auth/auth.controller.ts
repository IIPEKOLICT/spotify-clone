import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { ApiOperationDescription, Endpoint } from '../../constants/enums';
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

@ApiTags(Endpoint.AUTH)
@Controller(Endpoint.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @ApiOperation({ summary: ApiOperationDescription.AUTH_REFRESH_TOKEN })
  @ApiResponse({ type: UserEntity })
  @Get('refresh')
  async updateToken(@User() user: UserEntity, @Res({ passthrough: true }) response: Response): Promise<UserEntity> {
    this.authService.injectJwtTokenIntoResponseCookies(response, user);
    return user;
  }

  @ApiOperation({ summary: ApiOperationDescription.AUTH_LOGIN })
  @ApiResponse({ type: UserEntity })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@User() user: UserEntity, @Res({ passthrough: true }) response: Response): Promise<UserEntity> {
    this.authService.injectJwtTokenIntoResponseCookies(response, user);
    return user;
  }

  @ApiOperation({ summary: ApiOperationDescription.AUTH_REGISTER })
  @ApiResponse({ type: UserEntity })
  @Public()
  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Res({ passthrough: true }) response: Response, @Body() dto: RegisterDto): Promise<UserEntity> {
    const isExistsWithThisEmail: boolean = await this.userService.isExists({ email: dto.email });

    if (isExistsWithThisEmail) {
      throw new BadRequestError('User with this email already exists');
    }

    const user: UserEntity = await this.userService.create(dto);

    this.authService.injectJwtTokenIntoResponseCookies(response, user);
    return user;
  }
}
