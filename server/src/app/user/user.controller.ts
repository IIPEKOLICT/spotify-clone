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
import { ApiOperationDescription, Endpoint } from '../../constants/enums';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminEndpoint } from '../auth/decorators/admin-endpoint.decorator';
import { User } from './decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { DefaultResponseDto } from '../../shared/dto/default-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from '../storage/storage.service';

@ApiTags(Endpoint.USERS)
@Controller(Endpoint.USERS)
export class UserController {
  constructor(private readonly userService: UserService, private readonly storageService: StorageService) {}

  @ApiOperation({ description: ApiOperationDescription.USERS_GET_ALL })
  @ApiResponse({ type: [UserEntity] })
  @AdminEndpoint()
  @Get()
  async getAll(): Promise<UserEntity[]> {
    return this.userService.getAll();
  }

  @ApiOperation({ description: ApiOperationDescription.USERS_CREATE_USER })
  @ApiResponse({ type: UserEntity })
  @AdminEndpoint()
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(dto);
  }

  @ApiOperation({ description: ApiOperationDescription.USERS_GET_CURRENT })
  @ApiResponse({ type: UserEntity })
  @Get('current')
  async getCurrent(@User() user: UserEntity): Promise<UserEntity> {
    return user;
  }

  @ApiOperation({ description: ApiOperationDescription.USERS_UPDATE_CURRENT })
  @ApiResponse({ type: UserEntity })
  @Patch('current')
  async updateCurrent(@User() user: UserEntity, @Body() dto: UpdateUserDto): Promise<UserEntity> {
    return this.userService.updateById(user.id, dto);
  }

  @ApiOperation({ description: ApiOperationDescription.USERS_UPDATE_CURRENT_PICTURE })
  @ApiResponse({ type: UserEntity })
  @UseInterceptors(FileInterceptor('picture'))
  @Patch('current/picture')
  async updateCurrentPicture(@User() user: UserEntity, @UploadedFile() file: Express.Multer.File): Promise<UserEntity> {
    const link: string = await this.storageService.saveProfilePicture(user.id, file);
    return this.userService.updateById(user.id, { profilePicture: link });
  }

  @ApiOperation({ description: ApiOperationDescription.USERS_DELETE_CURRENT_PICTURE })
  @ApiResponse({ type: UserEntity })
  @Delete('current/picture')
  async deleteCurrentPicture(@User() user: UserEntity): Promise<UserEntity> {
    await this.storageService.removeProfilePicture(user.id);
    return this.userService.updateById(user.id, { profilePicture: null });
  }

  @ApiOperation({ description: ApiOperationDescription.USERS_DELETE_CURRENT })
  @ApiResponse({ type: DefaultResponseDto })
  @Delete('current')
  async deleteCurrent(@User() user: UserEntity): Promise<DefaultResponseDto> {
    await this.userService.deleteById(user.id);
    return DefaultResponseDto.new();
  }

  @ApiOperation({ description: ApiOperationDescription.USERS_DELETE_USER })
  @ApiResponse({ type: DefaultResponseDto })
  @AdminEndpoint()
  @Delete(':userId')
  async deleteUser(@Param('userId', ParseIntPipe) userId: number): Promise<DefaultResponseDto> {
    await this.userService.deleteById(userId);
    return DefaultResponseDto.new();
  }

  @ApiOperation({ description: ApiOperationDescription.USERS_BAN_USER })
  @ApiResponse({ type: UserEntity })
  @AdminEndpoint()
  @Patch(':userId/ban')
  async banUser(@Param('userId', ParseIntPipe) userId: number): Promise<UserEntity> {
    const user: UserEntity = await this.userService.getById(userId);
    return this.userService.updateById(userId, { isBanned: !user.isBanned });
  }
}
