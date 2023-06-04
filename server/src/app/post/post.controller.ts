import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiOperationSummary, Endpoint } from '../../constants/enums';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { UserEntity } from '../user/user.entity';
import { User } from '../user/decorators/user.decorator';
import { PostEntity } from './post.entity';
import { CrudPostDto } from './dto/crud-post.dto';
import { DefaultResponseDto } from '../../shared/dto/default-response.dto';

@ApiTags(Endpoint.POSTS)
@Controller(Endpoint.POSTS)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: ApiOperationSummary.POSTS_GET_ALL })
  @ApiResponse({ type: [PostEntity] })
  @Get()
  async getAll(
    @User() user: UserEntity,
    @Query('limit', ParseIntPipe) limit?: number,
    @Query('skip', ParseIntPipe) skip?: number,
  ): Promise<PostEntity[]> {
    return this.postService.getPaginated({ user }, limit, skip);
  }

  @ApiOperation({ summary: ApiOperationSummary.POSTS_CREATE })
  @ApiResponse({ type: PostEntity })
  @Post()
  async create(@User() user: UserEntity, @Body() dto: CrudPostDto): Promise<PostEntity> {
    return this.postService.create(dto);
  }

  @ApiOperation({ summary: ApiOperationSummary.POSTS_DELETE_BY_ID })
  @ApiResponse({ type: DefaultResponseDto })
  @Delete(':postId')
  async deleteById(@Param('postId') postId: string): Promise<DefaultResponseDto> {
    await this.postService.deleteById(postId);
    return DefaultResponseDto.new();
  }

  @ApiOperation({ summary: ApiOperationSummary.POSTS_UPDATE_TEXT })
  @ApiResponse({ type: PostEntity })
  @Patch(':postId/text')
  async updateText(@Param('postId') postId: string, @Body() dto: CrudPostDto): Promise<PostEntity> {
    return this.postService.updateById(postId, dto);
  }
}
