import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperationSummary, Endpoint, UserRole } from '../../constants/enums';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { DefaultResponseDto } from '../../shared/dto/default-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from '../storage/storage.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { BadRequestError } from '../../errors/bad-request.error';
import { UserMapper } from './mappers/user.mapper';

@ApiTags(Endpoint.USERS)
@Controller(Endpoint.USERS)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userMapper: UserMapper,
    private readonly storageService: StorageService,
  ) {}

  @ApiOperation({ summary: ApiOperationSummary.USERS_GET_ALL })
  @ApiResponse({ type: [UserEntity] })
  @Roles(UserRole.ADMIN)
  @Get()
  async getAll(): Promise<UserEntity[]> {
    return this.userMapper.mapMany(await this.userService.getAll());
  }

  @ApiOperation({ summary: ApiOperationSummary.USERS_CREATE_USER })
  @ApiResponse({ type: UserEntity })
  @Roles(UserRole.ADMIN)
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<UserEntity> {
    return this.userMapper.mapOne(await this.userService.create(dto));
  }

  @ApiOperation({ summary: ApiOperationSummary.USERS_GET_CURRENT })
  @ApiResponse({ type: UserEntity })
  @Get('current')
  async getCurrent(@User() user: UserEntity): Promise<UserEntity> {
    return this.userMapper.mapOne(user);
  }

  @ApiOperation({ summary: ApiOperationSummary.USERS_UPDATE_CURRENT })
  @ApiResponse({ type: UserEntity })
  @Patch('current')
  async updateCurrent(@User() user: UserEntity, @Body() dto: UpdateUserDto): Promise<UserEntity> {
    if (dto.email && (await this.userService.isExists({ email: dto.email }))) {
      throw new BadRequestError('User with this email already exists, choose another one');
    }

    return this.userMapper.mapOne(await this.userService.updateById(user.id, dto));
  }

  @ApiOperation({ summary: ApiOperationSummary.USERS_DELETE_CURRENT })
  @ApiResponse({ type: DefaultResponseDto })
  @Delete('current')
  async deleteCurrent(@User() user: UserEntity): Promise<DefaultResponseDto> {
    await this.userService.deleteById(user.id);
    return DefaultResponseDto.new();
  }

  @ApiOperation({ summary: ApiOperationSummary.USERS_UPDATE_CURRENT_PICTURE })
  @ApiBody({ description: 'Form data { "picture": image }' })
  @ApiResponse({ type: UserEntity })
  @UseInterceptors(FileInterceptor('picture'))
  @Patch('current/picture')
  async updateCurrentPicture(@User() user: UserEntity, @UploadedFile() file: Express.Multer.File): Promise<UserEntity> {
    const link: string = await this.storageService.saveProfilePicture(user.id, file);
    const updatedUser: UserEntity = await this.userService.updateById(user.id, { profilePicture: link });
    return this.userMapper.mapOne(updatedUser);
  }

  @ApiOperation({ summary: ApiOperationSummary.USERS_DELETE_CURRENT_PICTURE })
  @ApiResponse({ type: UserEntity })
  @Delete('current/picture')
  async deleteCurrentPicture(@User() user: UserEntity): Promise<UserEntity> {
    await this.storageService.removeProfilePicture(user.id);
    const updatedUser: UserEntity = await this.userService.updateById(user.id, { profilePicture: null });
    return this.userMapper.mapOne(updatedUser);
  }

  @ApiOperation({ summary: ApiOperationSummary.USERS_DELETE_USER })
  @ApiResponse({ type: DefaultResponseDto })
  @Roles(UserRole.ADMIN)
  @Delete(':userId')
  async deleteUser(@Param('userId', ParseIntPipe) userId: number): Promise<DefaultResponseDto> {
    await this.userService.deleteById(userId);
    return DefaultResponseDto.new();
  }

  @ApiOperation({ summary: ApiOperationSummary.USERS_BAN_USER })
  @ApiResponse({ type: UserEntity })
  @Roles(UserRole.ADMIN)
  @Patch(':userId/ban')
  async banUser(@Param('userId', ParseIntPipe) userId: number): Promise<UserEntity> {
    const user: UserEntity = await this.userService.getById(userId);
    const updatedUser: UserEntity = await this.userService.updateById(userId, { isBanned: !user.isBanned });
    return this.userMapper.mapOne(updatedUser);
  }

  @ApiOperation({ summary: ApiOperationSummary.USERS_UPDATE_USER_ROLE })
  @ApiResponse({ type: UserEntity })
  @Roles(UserRole.ADMIN)
  @Patch(':userId/role')
  async updateUserRole(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() body: UpdateUserRoleDto,
  ): Promise<UserEntity> {
    return this.userMapper.mapOne(await this.userService.updateById(userId, body));
  }
}
