import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GeneralResponseDTO } from 'src/auth/dto/auth.dto';
import { AccessTokenGuard } from 'src/auth/strategies/gaurd.access_token';
import { ErrorResponseDTO } from 'src/error/dto/error.response.dto';
import { UsersService } from 'src/users/users.service';
import { CommentariesService } from './commentaries.service';
import { CreateCommentaryDto } from './dto/create-commentary.dto';
import { Commentary } from './schemas/commentary.schema';

@ApiBearerAuth('access-token')
@ApiTags('commentaries')
@Controller('commentaries')
export class CommentariesController {
  constructor(
    private readonly commentariesService: CommentariesService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(AccessTokenGuard)
  @Post(':post_id')
  @ApiOperation({
    summary: 'Add Commentary endpoint',
    description: 'Commentary added',
  })
  @ApiResponse({
    status: 200,
    type: GeneralResponseDTO,
    description: 'Commentary has been added.',
  })
  @ApiResponse({
    status: 400,
    type: ErrorResponseDTO,
    description: 'Validation error',
  })
  async create(
    @Request() req: any,
    @Param('post_id') post_id: string,
    @Body() createCommentaryDto: CreateCommentaryDto,
  ) {
    if (createCommentaryDto.commentary) {
      return await this.commentariesService.create(
        req.user.id,
        post_id,
        createCommentaryDto,
      );
    } else {
      throw new HttpException(
        {
          message: 'Commentary and news ID are mandatory.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Get(':postId')
  @UseGuards(AccessTokenGuard)
  async findAll(@Param('postId') postId: string): Promise<Commentary[]> {
    return this.commentariesService.findAll(postId);
  }
}
