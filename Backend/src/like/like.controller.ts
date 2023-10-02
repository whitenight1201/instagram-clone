import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/strategies/gaurd.access_token';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikeService } from './like.service';

@ApiTags('like')
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  @Post(':post_id')
  async create(
    @Param('post_id') post_id: string,
    @Body() createLikeDto: CreateLikeDto,
    @Request() req: any,
  ) {
    const model = await this.likeService.find(post_id, req.user.id);
    if (!model) {
      await this.likeService.create(createLikeDto, req.user.id, post_id);
      return this.likeService.findcnt(post_id);
    } else {
      await this.likeService.update(req.user.id, post_id, createLikeDto.like);
      return this.likeService.findcnt(post_id);
    }
  }

  // @Get()
  // findAll() {
  //   return this.likeService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.likeService.findOne(+id);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likeService.remove(+id);
  }
}
