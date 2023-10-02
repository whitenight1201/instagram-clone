import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { Like, LikeSchema } from './schemas/like.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
  ],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
